const mongoose= require("mongoose")

const userplantSchema= mongoose.Schema({
    user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
    plant_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"plant",
        required:true
    },
    planting_date:{type:Date,},
    location:{type:String,}, //الشرفة الحديقة
    Status:{type:String,
            enum:["جيد","ذابل","مريض"],
    },
    water_frequency_days:{type:Number},
    actual_yield:{type: Number,},
})
let userPlant= mongoose.model("userPlant",userplantSchema)
module.exports =userPlant;
