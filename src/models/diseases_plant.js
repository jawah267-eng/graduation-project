const mongoose=require("mongoose");

const diseas_plant=mongoose.Schema({
    plant_id:{type:mongoose.Schema.Types.ObjectId,
        ref:"plants",
    },
    diseases_id:{type: mongoose.Schema.Types.ObjectId,
        ref:"diseases",
    },
    susceptibility:{type:Number},//درجة الحساسية

})
let dis_pl= mongoose.model("diseas_plant",diseas_plant)
module.exports= dis_pl; 