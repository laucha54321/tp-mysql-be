import {    getPersona,
            createPersona,
            getCursos,
            getCurso,
            createCurso
} from "./database.js";

import jwt from 'jsonwebtoken'
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:4200',
}))

// #region PERSONAS 

// Busco todas las personas y las traigo en un array
// No tiene mucho sentido retornar todas las personas
// 
// app.get("/personas",async (req,res)=>{
//     try{
//         const personas = await getPersonas()
//         res.send()
//     }
//     catch{
//         res.send('Error en getPersonas()')
//     }
// }); 

// Busco una persona con el id
app.get("/personas/:id",async (req,res)=>{
    //Hay que tener cuidado de no devolver el hash de la contrasena
    try{
        const persona = await getPersona(req.params.id);
        res.send({
            "nombre":persona.nombre,
            "apellido":persona.apellido,
            "email":persona.email,
            "fecha_nacimiento":persona.fecha_nacimiento,
            "fecha_creacion":persona.fecha_creacion
        });
    }
    catch{
        res.send('Error en getPersona(req.params.id)')
    }
});

//Creo una persona a travez de un post request
app.post("/personas", async (req,res)=>{
    try{
        res.send(await createPersona(req.body))
    }
    catch{
        res.send('Error en createPersona(req.body)')
    }
});

// app.post("/personas", async (req,res)=>{
//     const aux = await createPersona(req.body)
//     res.status(201).send(aux)
// });
// #endregion

// #region CURSOS
app.get("/cursos", async(req,res)=>{
    res.send(await getCursos())
});

app.get("/cursos/:id",async (req,res)=>{
    res.send(await getCurso(req.params.id))
});

app.post("/cursos", async (req,res)=>{
    const aux = await createCurso(req.body)
    res.status(201).send(aux)
});

// #endregion


// #region AUTH
app.post("/auth", authenticateToken, async (req,res)=>{
    res.send(await getPersona(req.id))
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,content)=>{
        if(err) return res.sendStatus(403);
        console.log(content.id)
        req.id = content.id
        next()
    });
}
// #endregion
 

app.listen(8080,()=>{
    console.log("Server running on localhost:8080")
});
