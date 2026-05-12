-- Tabla de carreras universitarias
CREATE TABLE careers (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    name            NVARCHAR(200)   NOT NULL,
    description     NVARCHAR(MAX),
    field           NVARCHAR(100)   NOT NULL,  -- Área de conocimiento
    subfield        NVARCHAR(100),
    duration_years  TINYINT         NOT NULL DEFAULT 5,
    job_outlook     NVARCHAR(500),
    avg_salary_min  INT,
    avg_salary_max  INT,
    created_at      DATETIME2       DEFAULT GETUTCDATE(),
    updated_at      DATETIME2       DEFAULT GETUTCDATE()
);

CREATE INDEX idx_careers_field ON careers(field);
CREATE INDEX idx_careers_name  ON careers(name);
