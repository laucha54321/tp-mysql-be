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
// valida si la contrasena es correcta,
// si es asi entonces crea un token que luego envia al front end
app.post("/login",async(req,res)=>{
    try{
        const { id, contrasena } = req.body;
        if(typeof(id) == Number){
            const validPass = await bcrypt.compare(contrasena, await getPasswordHash(id));
            if(validPass){
                const accessToken = jwt.sign({id:id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '5h'});
                res.send({
                    id: id,
                    accessToken: accessToken
                });
            }else{
                res.status(401).send("Credenciales Incorrectas")
            }
        }
        else{
            res.status(401).send("Credenciales Incorrectas")
        }
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