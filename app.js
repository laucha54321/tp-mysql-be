import {    getPersona,
            createPersona,
            getCursos,
            getCurso,
            createCurso,
            createCursoPersona,
            createCursoPersonaNota
} from "./database.js";

import jwt from 'jsonwebtoken'
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:4200',
}))

// #region PERSONA

//BUSCAR PERSONA
app.get("/personas/:id",async (req,res)=>{
    //Hay que tener cuidado de no devolver el hash de la contrasena
    try{
        const persona = await getPersona(req.params.id);
        res.send(persona);
    }
    catch{
        res.send('Error en getPersona(req.params.id)')
    }
});

//CREAR PERSONA
app.post("/personas", async (req,res)=>{
    try{
        res.send(await createPersona(req.body))
    }
    catch{
        res.send('Error en createPersona(req.body)')
    }
});
// #endregion

// #region CURSO

//BUSCAR CURSOS
app.get("/cursos", async(req,res)=>{
    try{
        res.send(await getCursos())
    }
    catch{
        res.send('Error en getCursos()')
    }
});

//BUSCAR CURSO
app.get("/cursos/:id",async (req,res)=>{
    try{
        res.send(await getCurso(req.params.id))
    }
    catch{
        res.send('Error en getCurso(req.params.id)')
    }
});

//CREAR CURSO
app.post("/cursos", async (req,res)=>{
    try{
        const aux = await createCurso(req.body)
        res.status(201).send(aux)
    }
    catch{
        res.send('Error en createCurso(req.body)')
    }
});

// #endregion

// #region CURSO_PERSONA

// CREAR CURSO_PERSONA
app.post("/curso_persona", async(req, res)=>{
    try{
        const aux = await createCursoPersona(req.body);
        res.status(201).send(aux)
    }
    catch{
        res.send("Error en createCursoPersona()")
    }
});
// #endregion

// #region CURSO_PERSONA_NOTA
app.post("/curso_persona_nota", async(req,res)=>{
    try{
        const aux = await createCursoPersonaNota(req.body);
        res.status(201).send(aux)
    }
    catch{
        res.send("Error en createCursoPersonaNota()")
    }
});


// #endregion


// #region AUTH
app.post("/auth", authenticateToken, async (req,res)=>{
    try{
        res.send(await getPersona(req.id))
    }
    catch{
        res.send('Error en la autenticacion')
    }
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    console.log(token)
    
    if(token == null){
        res.sendStatus(401);
    };
    
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
