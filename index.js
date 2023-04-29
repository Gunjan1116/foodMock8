const express=require("express");
const { connection } = require("mongoose");
const { userRoute } = require("./routes/userRoute");
const { restaurantRoute } = require("./routes/restaurantRoute");
require("dotenv").config();

const app=express();  

app.use(express.json());

app.get("/",(req,res)=>{
    
    res.send("Welcome to food delivery app!")
})

app.use("/",userRoute); 
app.use("/restaurants",restaurantRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error while connecting to DB");
        console.log(error);
    }
    console.log(`Server is running at port ${process.env.port}`)
})