import jwt from "jsonwebtoken";




export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token){
         res.status(401).json("You are not authenticated");
    }


    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
             res.status(403).json("Token not valid");
        }else{
            req.user = user;
            next()
        }
    });
}



export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            if(err){
                next(res.status(403).json("You are not authorized"))
            }
        }
    })
}