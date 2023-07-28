import {    getPersona,
            getPersonas,
            createPersona,
            getCursos,
            getCurso,
            createCurso
} from "./database.js";

import express from 'express';

const app = express();
app.use(express.json());


// #region PERSONAS 
app.get("/personas",async (req,res)=>{
    res.send(await getPersonas())
}); 

app.get("/personas/:id",async (req,res)=>{
    res.send(await getPersona(req.params.id))
});

app.post("/personas", async (req,res)=>{
    const aux = await createPersona(req.body)
    res.status(201).send(aux)
});
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

 

app.listen(8080,()=>{
    console.log("Server running on localhost:8080")
});
