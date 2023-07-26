import { getPersona, getPersonas, createPersona, getCursos, getCurso, createCurso, getPasswordHash } from "./database.js";
import express from 'express';
import bcrypt from 'bcrypt';

const app = express()
app.use(express.json())

// #region LOGIN
app.get("/login/:id", async(req,res)=>{
    res.send(await getPasswordHash(req.params.id))
});

app.post("/login",async(req,res)=>{
    const { id, contrasena} = req.body;
    const validPass = await bcrypt.compare(contrasena, await getPasswordHash(id));
    console.log(validPass);
    res.send("logged in")
});

// #endregion

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
