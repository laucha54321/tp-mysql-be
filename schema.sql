CREATE DATABASE user;
USE user;

CREATE TABLE personas(
    id integer PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL,
    apellido VARCHAR(15) NOT NULL,
    email VARCHAR(30),
    telefono VARCHAR(30),
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
);

