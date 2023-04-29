const mongoose=require("mongoose");


const restaurantSchema=mongoose.Schema({
    name:{type:String,require:true},
    address:{type:Object,require:true},
    menu:{type:Array,require:true}
})

const Restaurantmodel=mongoose.model("restaurant",restaurantSchema);

module.exports={
    Restaurantmodel
}


// {
//     _id: ObjectId,
//     name: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       zip: String
//     },
//     menu: [{
//       _id: ObjectId,
//       name: String,
//       description: String,
//       price: Number,
//       image: String
//     }]
//   }