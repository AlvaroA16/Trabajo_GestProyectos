CREATE TABLE universities (
    id                    SERIAL PRIMARY KEY,
    name                  VARCHAR(300)  NOT NULL,
    acronym               VARCHAR(20),
    location_city         VARCHAR(100)  NOT NULL,
    location_region       VARCHAR(100)  NOT NULL,
    type                  VARCHAR(20)   NOT NULL CHECK (type IN ('Pública', 'Privada')),
    website               VARCHAR(300),
    logo_url              VARCHAR(500),
    accreditation_status  VARCHAR(200),
    description           TEXT,
    created_at            TIMESTAMP     DEFAULT NOW(),
    updated_at            TIMESTAMP     DEFAULT NOW()
);

CREATE INDEX idx_universities_region ON universities(location_region);
CREATE INDEX idx_universities_type   ON universities(type);
