-- Talleres presenciales (plan piloto para 4to y 5to de secundaria)
CREATE TABLE workshops (
    id            INT IDENTITY(1,1) PRIMARY KEY,
    title         NVARCHAR(200)   NOT NULL,
    description   NVARCHAR(MAX),
    target_grade  NVARCHAR(30)    NOT NULL
                  CHECK (target_grade IN (N'4to de Secundaria', N'5to de Secundaria', 'Ambos')),
    date          DATE            NOT NULL,
    time_start    TIME            NOT NULL,
    time_end      TIME            NOT NULL,
    location      NVARCHAR(300)   NOT NULL,
    capacity      SMALLINT        NOT NULL DEFAULT 30,
    status        NVARCHAR(20)    NOT NULL DEFAULT 'próximo'
                  CHECK (status IN (N'próximo', 'en_curso', 'finalizado', 'cancelado')),
    created_at    DATETIME2       DEFAULT GETUTCDATE()
);

CREATE INDEX idx_workshops_date   ON workshops(date);
CREATE INDEX idx_workshops_status ON workshops(status);

-- Inscripciones a talleres
CREATE TABLE workshop_registrations (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    workshop_id     INT             NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
    student_name    NVARCHAR(200)   NOT NULL,
    student_email   NVARCHAR(254)   NOT NULL,
    school_name     NVARCHAR(300)   NOT NULL,
    grade           NVARCHAR(30)    NOT NULL,
    phone           NVARCHAR(20),
    status          NVARCHAR(20)    NOT NULL DEFAULT 'confirmado'
                    CHECK (status IN ('confirmado', 'cancelado', 'asistió')),
    registered_at   DATETIME2       DEFAULT GETUTCDATE(),
    CONSTRAINT uq_registration UNIQUE (workshop_id, student_email)
);

CREATE INDEX idx_registrations_workshop ON workshop_registrations(workshop_id);
