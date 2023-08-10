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


//#region PERSONAS
//Encontrar persona por ID
export async function getPersona(id){
    const[rows] = await pool.query(`
        SELECT *
        FROM persona
        WHERE ID = ? 
        `,[id]
    );
    //Elimino el hash de la contrasena para no pasarselo por la API
    delete rows[0].contrasena;
    return rows[0];
};

//Crear una Persona
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
    //Devuelvo el hash de la contrasena
    return rows[0].contrasena;
};

//#endregion

//#region CURSOS
export async function getCursos(){
    const result = await pool.query(`
        SELECT * FROM curso;
    `);
    return result;
};

export async function getCurso(id){
    const [rows] = await pool.query(`
        SELECT *
        FROM curso
        WHERE ID = ? 
        `,[id]
    );
    return rows[0];
};

export async function createCurso(param){
    const result = await pool.query(`
        INSERT INTO curso(nombre_curso,descripcion,profesor_id)
        VALUES (?,?,?)`,[param.nombre_curso, param.descripcion]
    );
    // const createTable = await pool.query(`
    //     CREATE TABLE fisicaAlumnos(
    //         id_alumno integer PRIMARY KEY
    //     );
    // `)
    return result;
};
//#endregion


//=======================================================
//Como Crear un Curso
//=======================================================
// console.log(await createCurso({
//     "nombre_curso":"Fisica 1",
//     "descripcion":"Cinematica",
//     "profesor_id":"2"
// }));

//=======================================================
//Como Crear un persona
//=======================================================
// console.log(await createPersona(
    // {
    //     "nombre":"Cillian",
    //     "apellido":"Murphy",
    //     "contrasena":"122312312",
    //     "email":"cilianmuyrphy@yahoo.com",
    //     "telefono":"23414234",
    //     "fecha_nacimiento":"1976-05-25"
    // }
// ),
// await createPersona(
//     {
//         nombre:'Laureano',
//         apellido:'Oliva',
//         contrasena:'sajkdlf',
//         email:'laureano@gmail.com',
//         telefono:'23414234',
//         fecha_nacimiento:'2001-07-25'
//     }
// ));

