const express = require("express")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({path:'./.env'})


const VerifyToken = (req,res,next) => {

     const token = req.headers["authorization"];

     if(!token) {

        return res.status(403).json({

            success:false,
            mess:"Token is Required for Authentication"
        })
     }

     try {

        const bearer= token.split(' ');
        console.log(bearer);
        const bearertoken = bearer[1];
        console.log(bearertoken)
        const data = jwt.verify(bearertoken,process.env.SECRET_KEY)
        console.log(data);
        req.user = data.user;
        return next();

     }

     catch(err) {
            return res.status(401).json({

                success:false,
                mess:"Invalid Token"
            })
     }


}

module.exports = VerifyToken;
