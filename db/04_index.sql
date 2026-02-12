--indices 

CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

CREATE INDEX IF NOT EXISTS idx_gropus_term ON groups(term);

CREATE INDEX IF NOT EXISTS idx_enrollments_student_group ON enrollments(student_id, group_id);