const mongoose = require("mongoose");

const soilSchema = new mongoose.Schema({
    name :{
        type: String,
        required:[true, " please enter soilType "],  
    },

description:{
        type:String,
        required:[true," please read the description"],
    },
types:{type:String,
        enum:["sandy","clay","loamy","silty","peat"],
    },

})
let siol= mongoose.model("soil",soilSchema)
module.exports= siol;