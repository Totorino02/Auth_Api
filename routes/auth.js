const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {loginValidator, registerValidator} = require("../validator/userValidator");

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then(()=>{console.log("DataBase is connected !")})
    .catch((error)=>{console.log(`Connection error ${error}`)});

//register users
router.post("/register", async(req,res)=>{
    //verify data whitch are submit
    const {error} = await registerValidator(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});

    //hashed the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user instance
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : hashedPassword
    });
    //check if the email exists on the database
    const emailExist = await User.findOne({email : req.body.email});
    console.log(emailExist);
    if(!emailExist) return res.status(400).json({message: "email already exists !"});
    
    const savedUser = await user.save()
        .then(() => res.status(201).json(savedUser))
        .catch(error => res.status(400).json(error));
});

//login users
router.post("/login",async(req,res)=>{
    //verify data whitch are submit
    const {error} = await loginValidator(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});
    //find if the user is already exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({message: "Username or Password is invalid"});
    //verify the entry password
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(!isValid) return res.status(401).json({message: "Username or Password is invalid"});
    //make this token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.setHeader("auth_token", token);
    res.status(200).json({message: "success"});
});

module.exports = router;