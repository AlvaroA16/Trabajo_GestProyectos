-- Relación carrera ↔ universidad (una carrera puede estar en muchas universidades)
CREATE TABLE career_university (
    id                  INT IDENTITY(1,1) PRIMARY KEY,
    career_id           INT             NOT NULL REFERENCES careers(id)      ON DELETE CASCADE,
    university_id       INT             NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    curriculum_url      NVARCHAR(500),
    total_credits       INT,
    duration_semesters  TINYINT,
    CONSTRAINT uq_career_university UNIQUE (career_id, university_id)
);

-- Cursos de la malla curricular por carrera y universidad
CREATE TABLE curriculum_courses (
    id                    INT IDENTITY(1,1) PRIMARY KEY,
    career_university_id  INT             NOT NULL REFERENCES career_university(id) ON DELETE CASCADE,
    course_name           NVARCHAR(200)   NOT NULL,
    credits               TINYINT         NOT NULL DEFAULT 3,
    semester              TINYINT         NOT NULL,
    course_type           NVARCHAR(20)    NOT NULL DEFAULT 'obligatorio'
                          CHECK (course_type IN ('obligatorio', 'electivo')),
    area                  NVARCHAR(100)
);

CREATE INDEX idx_courses_career_univ ON curriculum_courses(career_university_id);
CREATE INDEX idx_courses_semester    ON curriculum_courses(semester);
