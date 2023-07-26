CREATE DATABASE user;
USE user;

-- +------------------+--------------+------+-----+-------------------+-------------------+
-- | Field            | Type         | Null | Key | Default           | Extra             |
-- +------------------+--------------+------+-----+-------------------+-------------------+
-- | id_persona       | int          | NO   | PRI | NULL              | auto_increment    |
-- | nombre           | varchar(15)  | NO   |     | NULL              |                   |
-- | apellido         | varchar(15)  | NO   |     | NULL              |                   |
-- | email            | varchar(30)  | YES  |     | NULL              |                   |
-- | telefono         | varchar(30)  | YES  |     | NULL              |                   |
-- | contrasena       | varchar(255) | NO   |     | NULL              |                   |
-- | fecha_creacion   | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
-- | fecha_nacimiento | date         | NO   |     | NULL              |                   |
-- +------------------+--------------+------+-----+-------------------+-------------------+

CREATE TABLE personas(
    id_persona integer PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL,
    apellido VARCHAR(15) NOT NULL,
    email VARCHAR(30),
    telefono VARCHAR(30),
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +--------------+--------------+------+-----+---------+----------------+
-- | Field        | Type         | Null | Key | Default | Extra          |
-- +--------------+--------------+------+-----+---------+----------------+
-- | id_curso     | int          | NO   | PRI | NULL    | auto_increment |
-- | nombre_curso | varchar(25)  | NO   |     | NULL    |                |
-- | descripcion  | varchar(250) | YES  |     | NULL    |                |
-- | profesor_id  | int          | NO   |     | NULL    |                |
-- +--------------+--------------+------+-----+---------+----------------+

CREATE TABLE cursos(
    id_curso integer PRIMARY KEY AUTO_INCREMENT,
    nombre_curso VARCHAR(15) NOT NULL,
    descripcion VARCHAR(250),
    profesor_id integer NOT NULL
)
