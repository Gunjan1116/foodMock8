///api/restaurants  This endpoint should return a list of all available restaurants.
///api/restaurants/:id  This endpoint should return the details of a 
//specific restaurant identified by its ID.
///api/restaurants/:id/menu
//This endpoint should return the menu of a specific restaurant identified by its ID.
const express=require("express");
const { Restaurantmodel } = require("../models/restaurantModel");

const restaurantRoute=express.Router();

restaurantRoute.get("/",async(req,res)=>{
    try {
        let reqData=await Restaurantmodel.find();
        res.json({"data":reqData})
    } catch (error) {
        console.log("error while getting all restaurant data");
        res.json({"msg":"error while getting all restaurant data"});
    }
})

restaurantRoute.get("/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let reqData=await Restaurantmodel.find({_id:id});
        res.json({"data":reqData})
    } catch (error) {
        console.log("error while getting  restaurant data");
        res.json({"msg":"error while getting restaurant data"});
    }
})

restaurantRoute.get("/:id/menu",async(req,res)=>{
    let id=req.params.id
    try {
        let reqData=await Restaurantmodel.find({_id:id});
        res.json({"menuData":reqData[0].menu})
    } catch (error) {
        console.log("error while getting  restaurant menu data");
        res.json({"msg":"error while getting restaurant menu data"});
    }
})


module.exports={
    restaurantRoute
}