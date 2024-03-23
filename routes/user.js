const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {authMiddleware} =require('../middleware');
const router = express.Router();
 require('dotenv').config();

 const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post('/signUp',async(req,res)=>{

    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({

            message: "Email already taken / Incorrect inputs"
        })
    }

   
    const body = req.body
    

    const user = User.find({username:body.username})

    if(user){
        res.status(403).json({msg:"email id already been used"})
    }
    const dbUser= await User.create(body)

    const token = jwt.sign({userId: dbUser._id},process.env.JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token
    })

})


const signIn = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post('/signIn',(req,res)=>{
    const success = signIn.safeParse(req.body)
    if(!success){
        res.status(403).json({
            msg:"invalid data"
        })
    }
    const user = User.findOne({
        username:req.body.username,
        password:req.body.password,
    })
    if(!user){
        res.status(403).json({
            msg:'invalid credentials'
        })
        return;
        
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
    res.status(200).json({msg:"user logged In successfully",token:token})
})
//update user 
const updateBody = zod.object({
    username:zod.string().email(),
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put('/updateUser',async (req,res)=>{
    const success = updateBody.safeParse(req.body)
    if(!success){
        res.status(403).json({msg:"invalid details"})
    }

    await User.updateOne(req.body, {
        id: req.userId
    })
    res.json({mssg:"updated successfully"})
})




module.exports = router;