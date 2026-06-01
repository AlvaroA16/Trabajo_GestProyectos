CREATE TABLE workshops (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(200)  NOT NULL,
    description   TEXT,
    target_grade  VARCHAR(30)   NOT NULL
                  CHECK (target_grade IN ('4to de Secundaria', '5to de Secundaria', 'Ambos')),
    date          DATE          NOT NULL,
    time_start    TIME          NOT NULL,
    time_end      TIME          NOT NULL,
    location      VARCHAR(300)  NOT NULL,
    capacity      SMALLINT      NOT NULL DEFAULT 30,
    status        VARCHAR(20)   NOT NULL DEFAULT 'próximo'
                  CHECK (status IN ('próximo', 'en_curso', 'finalizado', 'cancelado')),
    created_at    TIMESTAMP     DEFAULT NOW()
);

CREATE INDEX idx_workshops_date   ON workshops(date);
CREATE INDEX idx_workshops_status ON workshops(status);

CREATE TABLE workshop_registrations (
    id              SERIAL PRIMARY KEY,
    workshop_id     INTEGER      NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
    student_name    VARCHAR(200) NOT NULL,
    student_email   VARCHAR(254) NOT NULL,
    school_name     VARCHAR(300) NOT NULL,
    grade           VARCHAR(30)  NOT NULL,
    phone           VARCHAR(20),
    status          VARCHAR(20)  NOT NULL DEFAULT 'confirmado'
                    CHECK (status IN ('confirmado', 'cancelado', 'asistió')),
    registered_at   TIMESTAMP    DEFAULT NOW(),
    CONSTRAINT uq_registration UNIQUE (workshop_id, student_email)
);

CREATE INDEX idx_registrations_workshop ON workshop_registrations(workshop_id);
