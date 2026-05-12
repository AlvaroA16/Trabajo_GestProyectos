-- Preguntas de la encuesta vocacional
CREATE TABLE survey_questions (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    question_text   NVARCHAR(500)   NOT NULL,
    question_type   NVARCHAR(30)    NOT NULL DEFAULT 'multiple_choice'
                    CHECK (question_type IN ('multiple_choice', 'scale', 'text')),
    category        NVARCHAR(100),
    order_num       INT             NOT NULL,
    CONSTRAINT uq_question_order UNIQUE (order_num)
);

-- Opciones de respuesta para preguntas de opción múltiple
CREATE TABLE survey_options (
    id                        INT IDENTITY(1,1) PRIMARY KEY,
    question_id               INT             NOT NULL REFERENCES survey_questions(id) ON DELETE CASCADE,
    option_text               NVARCHAR(300)   NOT NULL,
    -- Pesos de afinidad por área de carrera (JSON: {"Ingeniería y Tecnología": 2, ...})
    career_affinity_weights   NVARCHAR(MAX)
);

CREATE INDEX idx_options_question ON survey_options(question_id);

-- Respuestas individuales de un alumno (agrupadas por session_token)
CREATE TABLE survey_responses (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    session_token   NVARCHAR(36)    NOT NULL,
    question_id     INT             NOT NULL REFERENCES survey_questions(id),
    option_id       INT             REFERENCES survey_options(id),
    text_answer     NVARCHAR(MAX),
    created_at      DATETIME2       DEFAULT GETUTCDATE()
);

CREATE INDEX idx_responses_token ON survey_responses(session_token);

-- Resultado final calculado de la encuesta
CREATE TABLE survey_results (
    id                    INT IDENTITY(1,1) PRIMARY KEY,
    session_token         NVARCHAR(36)    NOT NULL UNIQUE,
    recommended_careers   NVARCHAR(MAX)   NOT NULL,  -- JSON array
    created_at            DATETIME2       DEFAULT GETUTCDATE()
);
