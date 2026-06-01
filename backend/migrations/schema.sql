-- ═══════════════════════════════════════════════
--  Decide Hoy — Schema completo PostgreSQL
--  Ejecutar en: Supabase → SQL Editor → New query
-- ═══════════════════════════════════════════════

-- 1. Usuarios
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

-- 2. Carreras
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

-- 3. Universidades
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

-- 4. Relación carrera ↔ universidad
CREATE TABLE career_university (
    id                  SERIAL PRIMARY KEY,
    career_id           INTEGER  NOT NULL REFERENCES careers(id)      ON DELETE CASCADE,
    university_id       INTEGER  NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    curriculum_url      VARCHAR(500),
    total_credits       INTEGER,
    duration_semesters  SMALLINT,
    CONSTRAINT uq_career_university UNIQUE (career_id, university_id)
);

-- 5. Mallas curriculares
CREATE TABLE curriculum_courses (
    id                    SERIAL PRIMARY KEY,
    career_university_id  INTEGER      NOT NULL REFERENCES career_university(id) ON DELETE CASCADE,
    course_name           VARCHAR(200) NOT NULL,
    credits               SMALLINT     NOT NULL DEFAULT 3,
    semester              SMALLINT     NOT NULL,
    course_type           VARCHAR(20)  NOT NULL DEFAULT 'obligatorio'
                          CHECK (course_type IN ('obligatorio', 'electivo')),
    area                  VARCHAR(100)
);

CREATE INDEX idx_courses_career_univ ON curriculum_courses(career_university_id);
CREATE INDEX idx_courses_semester    ON curriculum_courses(semester);

-- 6. Encuesta vocacional
CREATE TABLE survey_questions (
    id              SERIAL PRIMARY KEY,
    question_text   VARCHAR(500)  NOT NULL,
    question_type   VARCHAR(30)   NOT NULL DEFAULT 'multiple_choice'
                    CHECK (question_type IN ('multiple_choice', 'scale', 'text')),
    category        VARCHAR(100),
    order_num       INTEGER       NOT NULL,
    CONSTRAINT uq_question_order UNIQUE (order_num)
);

CREATE TABLE survey_options (
    id                      SERIAL PRIMARY KEY,
    question_id             INTEGER      NOT NULL REFERENCES survey_questions(id) ON DELETE CASCADE,
    option_text             VARCHAR(300) NOT NULL,
    career_affinity_weights TEXT
);

CREATE INDEX idx_options_question ON survey_options(question_id);

CREATE TABLE survey_responses (
    id              SERIAL PRIMARY KEY,
    session_token   VARCHAR(36)  NOT NULL,
    question_id     INTEGER      NOT NULL REFERENCES survey_questions(id),
    option_id       INTEGER      REFERENCES survey_options(id),
    text_answer     TEXT,
    created_at      TIMESTAMP    DEFAULT NOW()
);

CREATE INDEX idx_responses_token ON survey_responses(session_token);

CREATE TABLE survey_results (
    id                    SERIAL PRIMARY KEY,
    session_token         VARCHAR(36) NOT NULL UNIQUE,
    recommended_careers   TEXT        NOT NULL,
    created_at            TIMESTAMP   DEFAULT NOW()
);

-- 7. Talleres
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
