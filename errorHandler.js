const errorHandler = (error,req,res,next) =>{
    if(error.code){
        return res.status(error.code).send(error.message);
    }
    else{
        return res.status(500).send(error.message);
    }
}

export default errorHandler