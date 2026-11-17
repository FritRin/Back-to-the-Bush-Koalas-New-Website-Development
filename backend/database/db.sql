/* Creates all tables, primary keys, foreign keys, and constraints */


CREATE TABLE admins ( 
    admin_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password_hash TEXT NOT NULL 
); 

CREATE TABLE customer ( 
    customer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    first_name VARCHAR(50), 
    last_name VARCHAR(50), 
    email VARCHAR(50), 
    phone VARCHAR(20), 
    street_number VARCHAR(20), 
    street_name VARCHAR(50), 
    suburb VARCHAR(50), 
    state VARCHAR(50), 
    postcode VARCHAR(20), 
    country VARCHAR(50), 
    company_name VARCHAR(100), 
    created_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE koala ( 
    koala_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admins(admin_id),
    koala_name VARCHAR(100) NOT NULL, 
    description TEXT NOT NULL, 
    image_url TEXT, 
    status VARCHAR(50) NOT NULL, 
    date_added TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE koala_story ( 
    story_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    koala_id INTEGER NULL REFERENCES koala(koala_id),
    admin_id INTEGER NOT NULL REFERENCES admins(admin_id),  
    title VARCHAR(150) NOT NULL, 
    content TEXT NOT NULL,
    image_urls TEXT[] NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP 
); 

CREATE TABLE box_story (
    box_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    story_id INTEGER NULL REFERENCES koala_story (story_id),
    admin_id INTEGER NOT NULL REFERENCES admins(admin_id),  
    slot VARCHAR(50) NOT NULL
);

CREATE TABLE adoption ( 
    adoption_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    customer_id INTEGER NOT NULL REFERENCES customer(customer_id), 
    koala_id INTEGER NOT NULL REFERENCES koala(koala_id),
    status VARCHAR(50) NOT NULL,
    amount NUMERIC(18,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, 
    transaction_reference VARCHAR(255),
    adoption_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donation ( 
    donation_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    customer_id INTEGER NOT NULL REFERENCES customer(customer_id), 
    currency VARCHAR(3) NOT NULL, 
    amount DECIMAL(18, 2) NOT NULL, 
    payment_method VARCHAR(50) NOT NULL, 
    donation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    transaction_reference VARCHAR(100)
);

CREATE TABLE wishlist_item ( 
    item_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    item_name VARCHAR(50) NOT NULL, 
    item_description VARCHAR(100) NOT NULL, 
    item_image_url VARCHAR(100), 
    status VARCHAR(1) NOT NULL, 
    number_of_items INTEGER NOT NULL, 
    price DECIMAL(18, 2) NOT NULL
);

CREATE TABLE wishlist_purchase ( 
    purchase_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    customer_id INTEGER NOT NULL REFERENCES customer(customer_id), 
    item_id INTEGER NOT NULL REFERENCES wishlist_item(item_id), 
    purchase_quantity INTEGER NOT NULL, 
    purchase_price DECIMAL(18, 2) NOT NULL, 
    purchase_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(100) 
);