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
    'SCALPLAT',
    'Platform Scale',
    'Platform Weigh Scale',
    '/images/whishlist/Platform-weigh-scale.jpg',
    'A',
    1,
    764.00
),
(
    'SPEYKITD',
    'Dog Spey Surgical Kit',
    'Quality Canine Spey Kit (Spay Pack)',
    '/images/whishlist/quality-canine-spey-kit.jpg',
    'A',
    1,
    667.00
),
(
    'STOO07',
    'Clinic Stool Seat With Wheels',
    'Surgical Stool, round seat with wheels',
    '/images/whishlist/surgical-stool-round-seat-with-wheels.jpg',
    'A',
    1,
    292.00
),
(
    'INSTMT2',
    'Mayo instrument table',
    'Mayo table three leg',
    '/images/whishlist/mayo-table-three-leg.jpg',
    'A',
    1,
    950.00
),
(
    'INSTT45',
    'Instrument trolley',
    'Mayo table three leg',
    '/images/whishlist/inst-trolley-rail.jpg',
    'A',
    1,
    1282.00
),
(
    'CLIPCC1',
    'Cordless clippers',
    'Mayo table three leg',
    '/images/whishlist/codos-clippers.jpg',
    'A',
    3,
    70.00
),
(
    'LARYBM5',
    'Laryngoscope blade set',
    'Welch Allyn Fibre Optic Miller Laryngoscope set',
    '/images/whishlist/welch-allyn-fibre-optic.jpg',
    'A',
    1,
    2591.00
),
(
    '000000',
    'Refractometer',
    '',
    '/images/whishlist/temperature-compensated-urine.png',
    'A',
    1,
    156.00
),
(
    'DIAGW1',
    'Operating Diagnostic',
    'Welch Allyn Operating Diagnostic',
    '/images/whishlist/welch-allyn-operating-diagnostic-set.jpg',
    'A',
    1,
    00.00
)
ON CONFLICT (item_id) DO NOTHING;