const mongoose= require("mongoose")
const notesSchema= new mongoose.Schema({
    user_plant_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userplants",
    },
    note:{type:String,},
    date:{type:Date,},
})
let note=mongoose.model("note",notesSchema)
module.exports=note;