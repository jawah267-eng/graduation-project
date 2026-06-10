const db= require("../server");
const soilprop=require("../src/models/SoilProperties");
const soil=require("../src/models/soiltypes");


async function seedsoilprop() {

const sandy=await soil.findOne({ types: "sandy" });
const clay=await soil.findOne({ types: "clay" });
const loamy=await soil.findOne({ types: "loamy" });
const silty=await soil.findOne({ types:"silty"});
const peat=await soil.findOne({types:"peat"});


//moisture_level مستوى الرطوبة
//drainage تصريف المياه
//organicematter المواد العضوية 
// texture قوام التربة
let newsoilprop=[
    new soilprop({
    soil_type_id:sandy._id,
    ph_level:{ min: 5.5, max: 7.5 },
    moisture_level:"low",
    rainfall:"low",
    drainage:"high",
    organiceMatter:"low",
    texture:"coarse",
    }),

    new soilprop({
    soil_type_id:clay._id,
    ph_level:{ min:6, max: 8 },
    moisture_level:"high",
    rainfall:"moderate",
    drainage:"low",
    organiceMatter:"high",
    texture:"fine",
    }),

    new soilprop({
    soil_type_id:loamy._id,
    ph_level:{ min: 6, max: 7.5 },
    moisture_level:"moderate",
    rainfall:"moderate",
    drainage:"moderate",
    organiceMatter:"moderate",
    texture:"medium",
    }),

    new soilprop({
    soil_type_id:silty._id,
    ph_level:{ min: 6, max: 7.5 },
    moisture_level:"moderate",
    rainfall:"moderate",
    drainage:"low",
    organiceMatter:"moderate",
    texture:"smooth",
    }),

    new soilprop({
    soil_type_id:peat._id,
    ph_level:{ min: 3.5, max: 5.5 },
    moisture_level:"high",
    rainfall:"high",
    drainage:"low",
    organiceMatter:"very high",
    texture:"spongy",
    }),
];

    for(let prop of newsoilprop)
        try{
    await prop.save();
    console.log("saved soil prop for:", prop.soil_type_id);
    } catch(err){
        console.log(err);
    }
    process.exit();
}
seedsoilprop();