import express from "express";
import { getPasswordHash } from './database.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
    origin:'http://localhost:4200',
}))
app.use(express.json());

// #region LOGIN

app.post("/login",async(req,res)=>{
    try{
        const { id, contrasena } = req.body;
        const validPass = await bcrypt.compare(contrasena, await getPasswordHash(id));
        const accessToken = jwt.sign({id:id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '5h'});
        res.send({ accessToken: accessToken });
    }catch{
        if(req.body.id == null){
            res.send('No ID')
        }else if(req.body.contrasena == null){
            res.send('No Contrasena')
        }
    }
});



// #endregion

app.listen(3080,()=>{
    console.log("Server running on localhost:3080")
});