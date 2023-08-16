import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


//#region PERSONA

//BUSCAR PERSONA
export async function getPersona(id){
    const[rows] = await pool.query(`
        SELECT *
        FROM persona
        WHERE ID = ? 
        `,[id]
    );
    if(rows[0]){
        //ELIMINAR HASH DE PASSWORD
        delete rows[0].contrasena;
    }
    else{
        const error = new Error('NO EXISTE USUARIO con ese ID');
        error.code = 404;
        throw error;
    }
    return rows[0];
};

//CREAR PERSONA
export async function createPersona(param){
    const result = await pool.query(`
        INSERT INTO persona(nombre, apellido, contrasena, email, fecha_nacimiento)
        VALUES (?,?,?,?,?)`,[param.nombre, param.apellido, await bcrypt.hash(param.contrasena,11), param.email, param.fecha_nacimiento]
    );
    return result;
};

export async function getPasswordHash(id){
    const[rows] = await pool.query(`
        SELECT *
        FROM persona
        WHERE ID = ? 
        `,[id]
    );
    if(!rows[0]){
        const error = new Error('NO EXISTE USUARIO con ese ID');
        error.code = 404;
        throw error;
    }
    //Devuelvo el hash de la contrasena
    return rows[0].contrasena;
};

//#endregion

//#region CURSO

//BUSCAR CURSOS
export async function getCursos(){
    const result = await pool.query(`
        SELECT * FROM curso;
    `);
    return result;
};

//BUSCAR CURSO
export async function getCurso(id){
    const [rows] = await pool.query(`
        SELECT *
        FROM curso
        WHERE ID = ? 
        `,[id]
    );
    if(!rows[0]){
        const error = new Error('NO EXISTE CURSO con ese ID');
        error.code = 404;
        throw error;
    }
    return rows[0];
};

//CREAR CURSO
export async function createCurso(param){
    const result = await pool.query(`
        INSERT INTO curso(nombre,descripcion)
        VALUES (?,?)`,[param.nombre_curso, param.descripcion]
    );
    return result;
};
//#endregion

//#region CURSO_PERSONA

//CREAR CURSO_PERSONA
export async function createCursoPersona(param){
    const result = await pool.query(`
        INSERT INTO curso_persona(ID_Persona, ID_Curso, categoria)
        VALUES (?,?,?)`,[param.ID_Persona, param.ID_Curso, param.categoria]
    );
    return result;
}

//#endregion

//#region CURSO_PERSONA_NOTA

//CREAR CURSO_PERSONA_NOTA
export async function createCursoPersonaNota(param){
    const result = await pool.query(`
        INSERT INTO curso_persona_nota(ID_Persona, ID_Curso, descripcion, nota)
        VALUES (?,?,?,?)`,[param.ID_Persona, param.ID_Curso, param.descripcion, param.nota]
    );
    return result; 
}


//BUSCAR CURSO_PERSONA_NOTA POR ID PERSONA
export async function getCursoPersonaNota(id){
    const result = await pool.query(`
        SELECT nombre, curso.descripcion as tema, curso_persona_nota.descripcion,nota
        FROM curso_persona_nota 
        INNER JOIN curso
        ON curso_persona_nota.ID_Curso = curso.ID
        WHERE ID_Persona = ?`,[id]
    );
    return result;
}

//BUSCAR CURSO_PERSONA_NOTA DE TODOS LOS ALUMNOS DE UNA CLASE
export async function getCursoPersonaNota_Profesor(idProfesor){

    const result = await pool.query(`
        SELECT persona.nombre,persona.apellido, curso.nombre as materia, curso.descripcion as tema, curso_persona_nota.descripcion,nota
        FROM curso_persona
        INNER JOIN curso
        ON curso_persona.ID_Curso = curso.ID
        INNER JOIN curso_persona_nota
        ON curso_persona_nota.ID_Curso = curso.ID
        INNER JOIN persona
        ON curso_persona_nota.ID_Persona = persona.ID
        WHERE (categoria = 1 AND curso_persona.ID_Persona = ?) 
        `,[idProfesor]    
    );
    return result;
}

//#endregion

