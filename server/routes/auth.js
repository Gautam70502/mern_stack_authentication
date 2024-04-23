const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config({ path: "./.env" });
const VerfiyEmail = require("../middleware/verifyemail")
const router = express.Router();
const User = require("../models/UserModel");

const SECRET_KEY = process.env.SECRET_KEY;

router.get("/", (req, res) => {
  res.send("hello from router");
  console.log("hello");
});

router.post("/register", async (req, res) => {
  const { username, email, password, DateofBirth } = req.body;
  console.log(req.body);

  if (!username || !email || !password || !DateofBirth) {
    return res.status(422).json({ error: "empty field" });
  }

  const existuser = await User.findOne({ email });
  console.log(existuser);
  if (existuser) {
    return res.status(400).json({ error: "User Already Exist" });
  } else {
    const user = new User({ username, email, password, DateofBirth });
    const Usersaved = await user.save();
    if (Usersaved) {
      return res.status(200).json({ mess: "User saved Successfully" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ err: "Empty Field" });
  }

  const finduser = await User.findOne({ email: email, password: password });

  console.log(finduser);

  if (finduser) {
    const data = {
      user: {
        id: finduser.id,
      },
    };
    const authtoken = jwt.sign(data, SECRET_KEY, { expiresIn: "2h" });
    res.cookie("token", authtoken, {
      withCredentials: true,
      httpOnly: false,
    });
    return res
      .status(200)
      .json({
        mess: "Successfully Login",
        token: authtoken,
        tokenType: "Bearer",
      });
  } else {
    return res.status(400).json({ err: "Incoreect Email or Password" });
  }
});

router.post("/forgot_password",VerfiyEmail,async (req, res) => {

      console.log(req.email)    
      var OtpNumber = Math.floor(1000 + Math.random()*9999)
      console.log(OtpNumber)

      var transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user:"20ceutg136@ddu.ac.in",
          pass:"hgyq zlpp asrp jpbu"
        }
      });

      var mailOptions = {

        from :"20ceutg136@ddu.ac.in",
        to : "gautamrathod70502@gmail.com",
        subject: "Testing email",
        html:`<h1>Otp :- ${OtpNumber}</h1>`
      }

      transporter.sendMail(mailOptions, function(error,info){

        if(error) {
          console.log(error);
        }
        else {
          console.log(info.response)
          return res.status(200).json({mess:"Email Sent",otp:OtpNumber})
        }
      })
   
});

router.post("/setnewpassword", async(req,res) => {

  const {email,password} = req.body;

  const finduser =await User.findOne({email:email})

  if(finduser) {
     finduser.password = password;
     finduser.save();
     console.log(finduser)
     return res.status(200).json({mess:"user's password updated successfully"})
  }

})

module.exports = router;
