import { getPersona, getPersonas, createPersona } from "./database.js";
import express from 'express';

const app = express()

app.get("/personas",async (req,res)=>{
    res.send(await getPersonas())
})
app.get("/personas/:id",async (req,res)=>{
    res.send(await getPersona(req.params.id))
})

app.listen(8080,()=>{
    console.log("Server running on localhost:8080")
})
