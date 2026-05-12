-- Tabla de universidades peruanas
CREATE TABLE universities (
    id                    INT IDENTITY(1,1) PRIMARY KEY,
    name                  NVARCHAR(300)  NOT NULL,
    acronym               NVARCHAR(20),
    location_city         NVARCHAR(100)  NOT NULL,
    location_region       NVARCHAR(100)  NOT NULL,
    type                  NVARCHAR(20)   NOT NULL CHECK (type IN (N'Pública', N'Privada')),
    website               NVARCHAR(300),
    logo_url              NVARCHAR(500),
    accreditation_status  NVARCHAR(200),
    description           NVARCHAR(MAX),
    created_at            DATETIME2      DEFAULT GETUTCDATE(),
    updated_at            DATETIME2      DEFAULT GETUTCDATE()
);

CREATE INDEX idx_universities_region ON universities(location_region);
CREATE INDEX idx_universities_type   ON universities(type);
