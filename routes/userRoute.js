const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const {Usermodel}=require("../models/userModel")
const userRoute=express.Router();


userRoute.post("/register",async(req,res)=>{
    console.log(req.body);
    let {name,email,password,address}=req.body;
    try {
        let reqData=await Usermodel.find({email:email});
        if(reqData.length>0){
            return res.json({"msg":"You already register"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log("error while hashing the password",err)
            }else{
                let req=new Usermodel({name,email,password:hash,address});
                await req.save();
                res.status(201).json({"msg":"Successfully register"});
            }
        })
    } catch (error) {
        console.log("error while registering",error);
        res.json({"msg":"error while register"})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try {
       let reqData=await Usermodel.find({email});
       if(reqData.length>0){
        bcrypt.compare(password,reqData[0].password,(err,result)=>{
            if(result){
                var token=jwt.sign({userId:reqData[0]._id},process.env.key);
                res.json({"msg":"login success","token":token})

            }else{
                res.json({"msg":"something went wrong"})
            }
        })
       } 
    } catch (error) {
        console.log("error while login",error);
        res.json({"msg":"error while login"})
    }
})
///api/user/:id/reset

userRoute.patch("/user/:id/reset",async(req,res)=>{
    let id=req.params.id;
    //current password and new password
    let {current_password,new_password}=req.body;
    try {
        let reqData=await Usermodel.find({_id:id});
       if(reqData.length>0){
        bcrypt.compare(current_password,reqData[0].password,async(err,result)=>{
            if(result){
                bcrypt.hash(new_password,5,async(err,hash)=>{
                    if(err){
                        console.log("error while hashing the password",err)
                    }else{
                        let req=await Usermodel.findByIdAndUpdate({_id:id},{password:hash})
                        
                        res.status(204).json({"msg":"Successfully updated the password"});
                    }
                })

            }else{
                res.json({"msg":"something went wrong"})
            }
        })
    }
    } catch (error) {
        console.log("error while updating password",error);
        res.json({"msg":"error while updating password"})
    }
})
module.exports={
    userRoute
}
