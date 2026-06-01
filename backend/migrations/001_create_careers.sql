CREATE TABLE careers (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(200)  NOT NULL,
    description     TEXT,
    field           VARCHAR(100)  NOT NULL,
    subfield        VARCHAR(100),
    duration_years  SMALLINT      NOT NULL DEFAULT 5,
    job_outlook     VARCHAR(500),
    avg_salary_min  INTEGER,
    avg_salary_max  INTEGER,
    created_at      TIMESTAMP     DEFAULT NOW(),
    updated_at      TIMESTAMP     DEFAULT NOW()
);

CREATE INDEX idx_careers_field ON careers(field);
CREATE INDEX idx_careers_name  ON careers(name);
