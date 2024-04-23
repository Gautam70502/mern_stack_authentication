const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config('./.env')

const conn_url = process.env.CONNECTION_URL

const mongodb_connection = () => {

    mongoose.connect(conn_url).then(() => {

        console.log("MongoDb Connection Successfull !!!");
    }).catch((err)=>{
        console.log(err);
    })

}

module.exports = mongodb_connection;