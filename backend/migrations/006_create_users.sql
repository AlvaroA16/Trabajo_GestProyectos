CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(254)  NOT NULL,
    password_hash VARCHAR(255)  NOT NULL,
    full_name     VARCHAR(150)  NOT NULL,
    gender        VARCHAR(20)   NOT NULL
                  CHECK (gender IN ('Masculino', 'Femenino', 'Prefiero no decir')),
    age           INTEGER       NOT NULL CHECK (age BETWEEN 10 AND 100),
    created_at    TIMESTAMP     DEFAULT NOW(),
    CONSTRAINT uq_users_email UNIQUE (email)
);
