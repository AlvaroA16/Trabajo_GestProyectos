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
    question_id             INTEGER  NOT NULL REFERENCES survey_questions(id) ON DELETE CASCADE,
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
