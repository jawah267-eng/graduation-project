const db=require("../server");
const userplant=require("../src/models/userplants");
const fert=require("../src/models/Fertilizing");
const plantt=require("../src/models/plants");

async function seedfertiliz() {
    try{
        const uspl=await userplant.find();
        for(let up of uspl){
            const freqday2=upt.frequency_days;
            const upt=await plantt.findById(up.plant_id);
            const last_fertiliz_date= new Date();
            const next_fertiliz_date=new Date(last_fertiliz_date);
            next_fertiliz_date.setDate(next_fertiliz_date.getDate()+freqday2);


            const newfertiliz=new fert({
                user_plant_id: userPlant._id,
                last_fertilizing_date: last_fertiliz_date,
                frequency_days: freqday2,
                next_firtilizing_date:next_fertiliz_date ,
            });   
            await newWater.save();
                console.log("saved watering for",upt.common_name);
    }
} catch (err) {
    console.log(err);
    }
    process.exit();
        }

seedfertiliz();
    
