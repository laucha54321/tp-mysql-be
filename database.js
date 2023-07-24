import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

//Encontrar persona por ID
export async function getPersona(id){
    const[rows] = await pool.query(`
        SELECT *
        FROM personas
        WHERE id = ? 
        `,[id]
    )
    return rows[0]
};

//Crear una Persona
export async function createPersona(param){
    const result = await pool.query(`
        INSERT INTO personas(nombre, apellido, contrasena, email, telefono, fecha_nacimiento)
        VALUES (?,?,?,?,?,?)`,[param.nombre, param.apellido, param.contrasena, param.email, param.telefono, param.fecha_nacimiento]
    )
    return result
};

export async function getPersonas(){
    const result = await pool.query(`
        SELECT * FROM personas;
    `)
    return result
}


//Como Crear una Persona
// console.log(await createPersona(
//     {
//         nombre:'Cillian',
//         apellido:'Murphy',
//         contrasena:'122312312',
//         email:'cilianmuyrphy@yahoo.com',
//         telefono:'23414234',
//         fecha_nacimiento:'1976-05-25'
//     }
// ));


console.log(await getPersonas());