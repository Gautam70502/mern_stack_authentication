const express = require("express")
const router = express.Router();
const VerifyToken = require('../middleware/verfytoken')
const User = require('../models/UserModel')

router.get("/home",VerifyToken , async(req,res) => {

    const user = await User.findById({_id:req.user.id})
    console.log(req.user.id);
    console.log(user)
    res.json({user:user})
})

module.exports = router;
