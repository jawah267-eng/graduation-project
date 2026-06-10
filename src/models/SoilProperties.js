const mongoose= require("mongoose")   
    
    const soilProprtiesSchema= new mongoose.Schema({
    soil_type_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"soiltypes",
    },
    phlevel: {
min: {
    type: Number,
    required: true
},
max: {
    type: Number,
    required: true
}
},
    moisture_level:{type: String,},//مستوى الرطوبة
    rainfall:{  type: String,},

    drainage:{
        type: String,
        required:[true ,"please enter  the drainage of the soil"]
    },//تصريف المياه
    organiceMatter:{ type: String, },//المواد العضوية
    texture :{type:String,},// قوام التربة

})
let soilproprties=mongoose.model("soilProprties",soilProprtiesSchema)
module.exports=soilproprties;