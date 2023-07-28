import express from "express";
import { getPasswordHash } from './database.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// #region LOGIN

app.post("/login",async(req,res)=>{
    const { id, contrasena} = req.body;
    const validPass = await bcrypt.compare(contrasena, await getPasswordHash(id));
    console.log(validPass);
    const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
    res.send({ accessToken: accessToken});
});

// #endregion

app.listen(3080,()=>{
    console.log("Server running on localhost:3080")
});