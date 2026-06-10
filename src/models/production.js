const mongoose= require("mongoose")


const production= new mongoose.Schema({
    user_plant_id:{type: mongoose.Schema.Types.ObjectId,
        ref:"userPlant",
    },//الربط مع نبتة المستخدم
    year:{type:Number,required:true,},//السنة
    totalquantity:{type: Number, required:true},//الانتاج الكلي
    producdate:{type:Date,}//التاريح
})
let product=mongoose.model("production",production)
module.exports=product;