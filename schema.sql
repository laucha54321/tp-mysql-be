CREATE TABLE persona(
    ID integer PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL,
    apellido VARCHAR(15) NOT NULL,
    email VARCHAR(30),
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE curso(
    ID integer PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL,
    descripcion VARCHAR(250)
);
CREATE TABLE curso_persona(
	ID_Persona integer NOT NULL,
    ID_Curso integer NOT NULL,
    categoria integer NOT NULL,
    FOREIGN KEY (ID_Persona) REFERENCES persona(ID),
	FOREIGN KEY (ID_Curso) REFERENCES curso(ID),
    PRIMARY KEY (ID_Curso, ID_Persona)
);
CREATE TABLE curso_persona_nota(
	ID integer PRIMARY KEY AUTO_INCREMENT,
	ID_Persona integer NOT NULL,
    ID_Curso integer NOT NULL,
    FOREIGN KEY (ID_Persona) REFERENCES persona(ID),
	FOREIGN KEY (ID_Curso) REFERENCES curso(ID),
    descripcion VARCHAR(250),
    nota REAL
);
