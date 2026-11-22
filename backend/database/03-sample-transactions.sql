-- Create admin
INSERT INTO admins (
    first_name,
    last_name,
    email,
    password_hash
)
SELECT
    'test',
    'admin',
    'testadmin@btbk.com',
    'YOUR_HASH_HERE' -- REPLACE THIS WITH THE HASH
WHERE NOT EXISTS (
    SELECT 1
    FROM admins
    WHERE email = 'testadmin@btbk.com'
);


-- Create 1 sample customer
INSERT INTO customer(
    first_name,
    last_name,
    email,
    phone,
    suburb,
    state,
    postcode,
    country
)
SELECT
    'Test',
    'Customer',
    'test.customer@test.com',
    '0411111111',
    'Toowoomba',
    'Queensland',
    '4350',
    'Australia'
WHERE NOT EXISTS (
    SELECT 1
    FROM customer
    WHERE email = 'test.customer@test.com'
);


--Test Koala
INSERT INTO koala (
    admin_id,
    koala_name,
    description,
    image_url,
    status
)
SELECT
    admin_id,
    'Test Koala',
    'Sample koala for testing adoption transactions.',
    NULL,
    'Available'
FROM admins
WHERE NOT EXISTS (
    SELECT 1
    FROM koala
    WHERE koala_name = 'Test Koala'
)
ORDER BY admin_id
LIMIT 1;

-- Sample Item
INSERT INTO wishlist_item (
    item_id,
    item_name,
    item_description,
    item_image_url,
    status,
    number_of_items,
    price
)
VALUES (
    'TESTITEM',
    'Test Wishlist Item',
    'Sample item for testing wishlist purchases.',
    NULL,
    'A',
    100,
    50.00
)
ON CONFLICT (item_id) DO NOTHING;

-- Donations Sample data
INSERT INTO donation (
    customer_id,
    currency,
    amount,
    payment_method,
    donation_date,
    transaction_reference
)
SELECT
    c.customer_id,
    'AUD',
    d.amount,
    d.payment_method,
    d.donation_date,
    NULL
FROM (
    VALUES
        ('2026-06-04 09:15:00+10'::timestamptz, 'PayPal', 25.00),
        ('2026-06-12 14:32:00+10'::timestamptz, 'GiveNow', 50.00),
        ('2026-06-21 11:08:00+10'::timestamptz, 'PayPal', 100.00),
        ('2026-07-05 13:22:00+10'::timestamptz, 'GiveNow', 50.00),
        ('2026-07-14 10:05:00+10'::timestamptz, 'PayPal', 150.00),
        ('2026-07-27 15:31:00+10'::timestamptz, 'PayPal', 250.00),
        ('2026-08-03 09:02:00+10'::timestamptz, 'GiveNow', 20.00),
        ('2026-08-08 11:47:00+10'::timestamptz, 'PayPal', 40.00),
        ('2026-08-22 10:39:00+10'::timestamptz, 'GiveNow', 50.00),
        ('2026-09-01 08:55:00+10'::timestamptz, 'PayPal', 25.00),
        ('2026-09-12 10:30:00+10'::timestamptz, 'GiveNow', 125.00),
        ('2026-09-26 11:18:00+10'::timestamptz, 'GiveNow', 300.00),
        ('2026-10-02 09:41:00+10'::timestamptz, 'PayPal', 10.00),
        ('2026-10-15 10:14:00+10'::timestamptz, 'GiveNow', 100.00),
        ('2026-11-07 11:59:00+10'::timestamptz, 'GiveNow', 50.00),
        ('2026-11-16 13:48:00+10'::timestamptz, 'PayPal', 150.00)
) AS d(donation_date, payment_method, amount)
CROSS JOIN customer c
WHERE c.email = 'test.customer@test.com'
    AND NOT EXISTS (
        SELECT 1
        FROM donation existing
        WHERE existing.customer_id = c.customer_id
        AND existing.donation_date = d.donation_date
        AND existing.amount = d.amount
        AND existing.payment_method = d.payment_method
    );

-- Adoptions sample data
INSERT INTO adoption (
    customer_id,
    koala_id,
    status,
    amount,
    payment_method,
    transaction_reference,
    adoption_date
)
SELECT
    c.customer_id,
    k.koala_id,
    'Active',
    a.amount,
    a.payment_method,
    NULL,
    a.adoption_date
FROM (
    VALUES
        ('2026-06-18 10:30:00+10'::timestamptz, 60.00, 'PayPal'),
        ('2026-07-11 14:15:00+10'::timestamptz, 60.00, 'GiveNow'),
        ('2026-08-05 09:45:00+10'::timestamptz, 80.00, 'PayPal'),
        ('2026-08-24 16:20:00+10'::timestamptz, 60.00, 'GiveNow'),
        ('2026-09-15 11:10:00+10'::timestamptz, 100.00, 'PayPal'),
        ('2026-10-09 13:40:00+10'::timestamptz, 60.00, 'GiveNow'),
        ('2026-10-25 10:05:00+10'::timestamptz, 80.00, 'PayPal'),
        ('2026-11-18 15:30:00+10'::timestamptz, 100.00, 'GiveNow')
) AS a(adoption_date, amount, payment_method)
CROSS JOIN customer c
CROSS JOIN koala k
WHERE c.email = 'test.customer@test.com'
  AND k.koala_name = 'Test Koala'
  AND NOT EXISTS (
      SELECT 1
      FROM adoption existing
      WHERE existing.customer_id = c.customer_id
        AND existing.koala_id = k.koala_id
        AND existing.adoption_date = a.adoption_date
        AND existing.amount = a.amount
        AND existing.payment_method = a.payment_method
  );

-- Wishlist purchase sample data
INSERT INTO wishlist_purchase (
customer_id,
item_id,
purchase_quantity,
purchase_price,
purchase_date,
payment_method,
transaction_reference
)
SELECT
c.customer_id,
'TESTITEM',
p.purchase_quantity,
p.purchase_quantity * 50.00,
p.purchase_date,
p.payment_method,
NULL
FROM (
VALUES
    ('2026-06-09 12:20:00+10'::timestamptz, 1, 'PayPal'),
    ('2026-06-25 15:10:00+10'::timestamptz, 2, 'GiveNow'),
    ('2026-07-08 10:45:00+10'::timestamptz, 1, 'PayPal'),
    ('2026-07-22 14:30:00+10'::timestamptz, 3, 'GiveNow'),
    ('2026-08-12 09:15:00+10'::timestamptz, 1, 'PayPal'),
    ('2026-09-08 13:50:00+10'::timestamptz, 2, 'GiveNow'),
    ('2026-09-21 11:25:00+10'::timestamptz, 1, 'PayPal'),
    ('2026-10-12 16:05:00+10'::timestamptz, 2, 'PayPal'),
    ('2026-11-05 10:35:00+10'::timestamptz, 1, 'GiveNow'),
    ('2026-11-19 14:55:00+10'::timestamptz, 3, 'PayPal')

) AS p(purchase_date, purchase_quantity, payment_method)
CROSS JOIN customer c
WHERE c.email = 'test.customer@test.com'
    AND NOT EXISTS (
        SELECT 1
        FROM wishlist_purchase existing
        WHERE existing.customer_id = c.customer_id
            AND existing.item_id = 'TESTITEM'
            AND existing.purchase_date = p.purchase_date
            AND existing.purchase_quantity = p.purchase_quantity
            AND existing.purchase_price = p.purchase_quantity * 50.00
            AND existing.payment_method = p.payment_method
    );