--ROLES.SQL 

--por si ya existe el usuario 
DROP ROLE IF EXISTS app_user;

-- Crear usuario de la aplicación 
CREATE ROLE app_user WITH 
LOGIN 
PASSWORD 'firewall113'
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
INHERIT;

--Permiso basico de conexion 
REVOKE ALL ON SCHEMA public FROM public;
GRANT USAGE ON SCHEMA public TO app_user;

--Minimos permisos a solo lectura
GRANT SELECT ON vw_course_performance TO app_user;
GRANT SELECT ON vw_teacher_load TO app_user;
GRANT SELECT ON vw_students_at_risk TO app_user;
GRANT SELECT ON vw_attendance_by_group TO app_user;
GRANT SELECT ON vw_rank_students TO app_user;

