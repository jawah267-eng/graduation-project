const db=require("../server");
const water=require("../src/models/watering");
const userplant=require("../src/models/userplants");
const plant=require("../src/models/plants");

async function seedWater() {
try{
const userpl=await userplant.find();

for(let up of userpl){
    const upt=await plant.findById(up.plant_id);
    const freqday=upt.frequency_days;
    const last_watering_date=new Date();
    const next_watering_date=new Date(last_watering_date);
    next_watering_date.setDate(next_watering_date.getDate()+freqday);


    const newWater = new water({
        user_plant_id: upt,
        last_watering_date: lastWatering,
        frequency_days: frequencyDays,
        next_watering_date: nextWatering,
        notes: "auto generated"
    });
    await newWater.save();
    console.log("saved watering for",upt.common_name);
    }
} catch (err) {
    console.log(err);
    }
    process.exit();
}
seedWater();