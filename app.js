import {    getPersona,
            createPersona,
            getCursos,
            getCurso,
            createCurso,
            createCursoPersona,
            createCursoPersonaNota,
            getCursoPersonaNota,
            getCursoPersonaNota_Profesor
} from "./database.js";

import jwt from 'jsonwebtoken'
import express from 'express';
import cors from 'cors';
import errorHandler from "./errorHandler.js";

import tryCatch from "./tryCatch.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:4200',
}))

// #region PERSONA

//BUSCAR PERSONA
app.get("/personas/:id",
    tryCatch(
        async (req,res,next)=>{
            const persona = await getPersona(req.params.id);
            res.send(persona);
        }
    )
);

//CREAR PERSONA
app.post("/personas", 
    tryCatch(
        async (req,res,next)=>{
            res.send(await createPersona(req.body));
        }
    )    
);
// #endregion

// #region CURSO

//BUSCAR CURSOS
app.get("/cursos", 
    tryCatch(
        async(req,res,next)=>{
            res.send(await getCursos())
        }   
    )
);

//BUSCAR CURSO
app.get("/cursos/:id",
    tryCatch(
        async (req,res,next)=>{
            const curso = await getCurso(req.params.id);
            res.send(curso);
        }
    )
);

//CREAR CURSO
app.post("/cursos",
    tryCatch(
        async (req,res,next)=>{
            const aux = await createCurso(req.body)
            res.status(201).send(aux)
        }
    )
);

// #endregion

// #region CURSO_PERSONA

// CREAR CURSO_PERSONA
app.post("/curso_persona",
    tryCatch(
        async(req, res,next)=>{
            const aux = await createCursoPersona(req.body);
            res.status(201).send(aux)
        }
    )
);
// #endregion

// #region CURSO_PERSONA_NOTA

//CREAR CURSO_PERSONA_NOTA
app.post("/curso_persona_nota", 
    tryCatch(
        async(req,res,next)=>{
            const aux = await createCursoPersonaNota(req.body);
            res.status(201).send(aux)
        }
    )
);

//BUSCAR CURSO_PERSONA_NOTA CON ID TOKEN
app.get("/curso_persona_nota",authenticateToken,
        tryCatch(
            async(req,res,next)=>{
                const aux = await getCursoPersonaNota(req.id);
                res.status(201).send(aux)
            }
        )
)
app.get("/curso_persona_nota/profesor",authenticateToken,
        tryCatch(
            async(req,res,next)=>{
                const aux = await getCursoPersonaNota_Profesor(req.id);
                res.status(201).send(aux)
            }
        )
)


// #endregion

// #region AUTH
app.post("/auth", authenticateToken,
     tryCatch(
        async (req,res,next)=>{
            res.send(await getPersona(req.id))
        }
    )
)

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null){
        res.sendStatus(401);
    };
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,content)=>{
        if(err) return res.sendStatus(403);
        req.id = content.id;
        next();
    });
}
// #endregion

app.use(errorHandler);
app.listen(8080,()=>{
    console.log("Server running on localhost:8080")
});
