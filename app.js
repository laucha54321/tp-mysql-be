import {    getPersona,
            getPersonas,
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
app.get("/personas",async (req,res)=>{
    res.send(await getPersonas())
}); 

app.get("/personas/:id",async (req,res)=>{
    res.send(await getPersona(req.params.id))
});

app.post("/personas", async (req,res)=>{
    res.send(await createPersona(req.body))
    console.log(req.body)
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
