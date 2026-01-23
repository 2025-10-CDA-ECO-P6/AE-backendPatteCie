-- createTable -  script.sql

-- Activate the extension UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- TABLE USER
CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    role VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE ANIMAL
CREATE TABLE "Animal" (
    animal_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    sex CHAR(1) NOT NULL,
    date_of_birth DATE NOT NULL,
    species VARCHAR(50) NOT NULL,
    race VARCHAR(50) NOT NULL,
    weight_kg INTEGER NOT NULL,
    color VARCHAR(50) NOT NULL,
    sterilizes BOOLEAN NOT NULL,
    chip_number INTEGER NOT NULL,
    photo VARCHAR(255),
    owner_id INTEGER NOT NULL,
    CONSTRAINT fk_owner
        FOREIGN KEY (owner_id)
        REFERENCES "User"(user_id)
        ON DELETE CASCADE
);

-- TABLE VISIT
CREATE TABLE "Visit" (
    visit_id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    reason VARCHAR(200) NOT NULL,
    comments TEXT NOT NULL,
    diagnosis TEXT,
    animal_id INTEGER NOT NULL,
    CONSTRAINT fk_animal
        FOREIGN KEY (animal_id)
        REFERENCES "Animal"(animal_id)
        ON DELETE CASCADE
);

-- TABLE TREATMENT
CREATE TABLE "Treatment" (
    treatment_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    reason TEXT NOT NULL,
    comments TEXT NOT NULL,
    visit_id INTEGER NOT NULL,
    CONSTRAINT fk_visit_treatment
        FOREIGN KEY (visit_id)
        REFERENCES "Visit"(visit_id)
        ON DELETE CASCADE
);

-- TABLE VACCINE
CREATE TABLE "Vaccine" (
    vaccine_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    notes VARCHAR(255),
    visit_id INTEGER NOT NULL,
    CONSTRAINT fk_visit_vaccine
        FOREIGN KEY (visit_id)
        REFERENCES "Visit"(visit_id)
        ON DELETE CASCADE
);
