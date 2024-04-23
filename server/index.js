const express = require("express")
const bodyparser = require('body-parser')
const cors = require("cors")
const app = express();
const dotenv = require("dotenv")
dotenv.config({path:'./.env'})
const port = process.env.PORT

// mongoDb Connection 
const mongodb_connection = require('./db/connect');
mongodb_connection();


app.use(express.json())
// app.use(bodyparser.urlencoded({extended:true}))
app.use(cors());

// Routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/user',require('./routes/user'))



// Listner
app.listen(port,() => {

    console.log(`Server listening at port ${port}`)
})