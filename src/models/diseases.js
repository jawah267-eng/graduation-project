const mongoose=require("mongoose");

const diseasesSchema=new mongoose.Schema({
    name:{type:String},
    diseasestype:{type:String,
    enum: ["fungal", "bacterial", "viral", "nematode", "abiotic","pest"],
    },
    symptoms:{type:String},
    prevention:{type:String},
    treatment:{type:String},
    peak_season:{type:String,
        enum:["spring","autumn","winter","summer"],
    },

})
let diseas=mongoose.model("diseases",diseasesSchema)
module.exports=diseas;