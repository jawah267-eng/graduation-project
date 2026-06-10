const mongoose= require("mongoose")

const FertilizingSchema= new mongoose.Schema({
user_plant_id:{
type: mongoose.Schema.Types.ObjectId,
ref: "userplants "
},    
fertilizer_type:{type: String,},
last_fertilizing_date:{type:Date,},
frequency_days:{type:Number,},
next_fertilizing_date:{type:Date},
})
let Fertilizing = mongoose.model("fertilizing" ,FertilizingSchema)
module.exports = Fertilizing;
