CREATE TABLE career_university (
    id                  SERIAL PRIMARY KEY,
    career_id           INTEGER  NOT NULL REFERENCES careers(id)      ON DELETE CASCADE,
    university_id       INTEGER  NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    curriculum_url      VARCHAR(500),
    total_credits       INTEGER,
    duration_semesters  SMALLINT,
    CONSTRAINT uq_career_university UNIQUE (career_id, university_id)
);

CREATE TABLE curriculum_courses (
    id                    SERIAL PRIMARY KEY,
    career_university_id  INTEGER     NOT NULL REFERENCES career_university(id) ON DELETE CASCADE,
    course_name           VARCHAR(200) NOT NULL,
    credits               SMALLINT    NOT NULL DEFAULT 3,
    semester              SMALLINT    NOT NULL,
    course_type           VARCHAR(20) NOT NULL DEFAULT 'obligatorio'
                          CHECK (course_type IN ('obligatorio', 'electivo')),
    area                  VARCHAR(100)
);

CREATE INDEX idx_courses_career_univ ON curriculum_courses(career_university_id);
CREATE INDEX idx_courses_semester    ON curriculum_courses(semester);
