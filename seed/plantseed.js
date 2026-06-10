const db= require("../server");
const plantt= require("../src/models/plants");

let newplants=[
new plantt ({
    common_name:"جلد النمر",
    scientific_name:"Sansevieria trifasciata",
    family:"الهليونية (Asparagaceae)",
    planting_season:"يمكن زراعته في أي وقت داخل المنزل، لكن الأفضل في الربيع والصيف.",
    growth_period:"ينمو ببطء نسبيًا، ويستمر لسنوات طويلة.",
    category:"زينة",
    preferred_siol:"تربة خفيفة جيدة التصريف (تربة صبار أو خليط رملي)",
    ph_range:{"min":5.5, "max": 7.5},
    temperature_range:{"min":15 ,"max": 30},
    water_requirement:"low",
    light_requirement:"يتحمل الإضاءة الضعيفة، لكن يفضل الضوء غير المباشر المتوسط إلى القوي.",
    drought_tolerance:"high",
    frost_tolerance:"low",
}),
new plantt({
common_name:"البوتس",
scientific_name:"Epipremnum aureum", 
family:"Araceae",
planting_season:"spring_summer",
growth_period:"نمو سريع نسبيًا طوال السنة",
category:"زينة",
preferred_siol:"تربة خفيفة جيدة التصريف (خليط بيتموس + بيرلايت)",
ph_range:{"min":6.0,"max": 7.0}, 
temperature_range:{"min":18 ,"max": 30},
water_requirement:"moderate", 
light_requirement:"ضوء غير مباشر متوسط إلى قوي (يتحمل الإضاءة الضعيفة)",
drought_tolerance:"moderate", 
frost_tolerance:"ضعيف (لا يتحمل أقل من 10 درجات مئوية)",
}),
new plantt({
common_name:"الشاميدورا",
scientific_name:"Chamaedorea elegans",
family:"Arecaceae",
planting_season:"spring_summer",
growth_period:"slow_to_moderate",
category:"زينة",
preferred_siol: "well_drained_peat_perlite_mix",
ph_range:{"min": 5.5,"max": 7.0}, 
temperature_range: { "min": 18,"max": 27} ,
water_requirement:"moderate", 
light_requirement:"indirect_low_to_medium",
drought_tolerance:"low", 
frost_tolerance:"very_low",
}),
new plantt({
common_name: "الافندر",
scientific_name:  "Lavandula angustifolia" ,
family :  "Lamiaceae" ,
planting_season : " spring" ,
growth_period :  "moderate" ,
category : "اعشاب" ,
preferred_siol :  "well_drained_sandy_soil" ,
ph_range : {min : 6.5,max : 8.0},
temperature_range : {min : 15,max : 30},
water_requirement :  "low",
light_requirement: "full_sun" ,
drought_tolerance :  "high" ,
frost_tolerance :  "moderate",
}),
new plantt({
common_name:"الياسمين البلدي",
scientific_name:"Jasminum sambac", 
family:"Oleaceae",
planting_season:"spring" ,
growth_period:"2-3 سنوات للوصول إلى النمو الكامل",
category:"زينة",
preferred_siol:"تربة خفيفة جيدة التصريف (رملية أو طميية)",
ph_range:{min: 6,max: 7.5},
temperature_range:{ min: 15,max: 35},
water_requirement:"moderate", 
light_requirement:"شمس كاملة إلى ظل جزئي",
drought_tolerance:"moderate", 
frost_tolerance:"ضعيفة (لا تتحمل الصقيع)", 
}),

new plantt({
common_name:"عطر الليل",
scientific_name:"Cestrum nocturnum", 
family:"Solanaceae",
planting_season:"spring",
growth_period:"1-2 سنوات للنمو الكامل",
category:"زينة",
preferred_siol:"تربة جيدة التصريف، غنية بالمواد العضوية",
ph_range:{ min:6 ,max:7.5}, 
temperature_range:{ min: 15,max: 35},
water_requirement: "moderate", 
light_requirement:"شمس كاملة إلى ظل جزئي",
drought_tolerance: "moderate", 
frost_tolerance:"ضعيفة (لا تتحمل الصقيع)",    
}),
new plantt({
    common_name:"البندورة",
    scientific_name:"Solanum lycopersicum",
    family:"Solanaceae",
    planting_season:"spring",
    growth_period:"60-90 days",
    category:"vegetables",
    preferred_siol:"loamy, well-drained",
    ph_range:{ min: 6, max:7},
    temperature_range:{ min: 18, max:30  },
    water_requirement:"moderate",
    light_requirement:"full sun",
    drought_tolerance:"low",
    frost_tolerance:"low",

}),
new plantt({
common_name:"Potato",
scientific_name:"Solanum tuberosum",
family:"Solanaceae",
planting_season:"sprnig",
growth_period:"90-120 days",
category:"vegetables",
preferred_siol:"تتطلب البطاطا تربة جيدة التصريف والتهوية، مسامية",
ph_range:{min:5 , max:6},
temperature_range:{min:15 , max:18},
water_requirement:"moderate-high",
light_requirement:"full sun",
drought_tolerance:"low",
frost_tolerance: "moderate (tolerates light frost but not severe frost)",
    
}),
new plantt({
    common_name: "Pepper",
    scientific_name: "Capsicum annuum",
    family: "Solanaceae",
    planting_season: "spring",
    growth_period: "60-90 days",
    category: "vegetables",
    preferred_soil: "loamy, well-drained",
    ph_range: { min: 6, max: 7 },
    temperature_range: { min: 18, max: 30 },
    water_requirement: "moderate",
    light_requirement: "full sun",
    drought_tolerance: "low",
    frost_tolerance: "low"
}),
new plantt({
    common_name: "Apple",
    scientific_name: "Malus domestica",
    family: "Rosaceae",
    planting_season: "winter dormancy",
    growth_period: "180-240 days",
    category: "fruit",
    preferred_soil: "deep, loamy soil",
    ph_range: { min: 6, max: 7 },
    temperature_range: { min: -5, max: 25 },
    water_requirement: "moderate",
    light_requirement: "full sun",
    drought_tolerance: "moderate",
    frost_tolerance: "high"
}),
new plantt({
    common_name: "Cucumber",
    scientific_name: "Cucumis sativus",
    family: "Cucurbitaceae",
    planting_season: "spring-summer",
    growth_period: "50-70 days",
    category: "vegetables",
    preferred_soil: "loamy, well-drained",
    ph_range: { min: 6, max: 7 },
    temperature_range: { min: 18, max: 30 },
    water_requirement: "high",
    light_requirement: "full sun",
    drought_tolerance: "low",
    frost_tolerance: "low"
}),
new plantt({
    common_name: "Corn",
    scientific_name: "Zea mays",
    family: "Poaceae",
    planting_season: "spring",
    growth_period: "90-120 days",
    category: "vegetables",
    preferred_soil: "fertile, well-drained loamy soil",
    ph_range: { min: 6, max: 7 },
    temperature_range: { min: 18, max: 32 },
    water_requirement: "high",
    light_requirement: "full sun",
    drought_tolerance: "low",
    frost_tolerance: "low"
}),
new plantt({
    common_name: "Carrot",
    scientific_name: "Daucus carota",
    family: "Apiaceae",
    planting_season: "cool season",
    growth_period: "70-80 days",
    category: "vegetables",
    preferred_soil: "sandy, loose soil",
    ph_range: { min: 6, max: 6.8 },
    temperature_range: { min: 12, max: 22 },
    water_requirement: "moderate",
    light_requirement: "full sun",
    drought_tolerance: "moderate",
    frost_tolerance: "high"
}),
new plantt({
    common_name: "Strawberry",
    scientific_name: "Fragaria × ananassa",
    family: "Rosaceae",
    planting_season: "spring",
    growth_period: "90-120 days",
    category: "fruit",
    preferred_soil: "loamy, well-drained",
    ph_range: { min: 5.5, max: 6.5 },
    temperature_range: { min: 15, max: 25 },
    water_requirement: "moderate",
    light_requirement: "full sun",
    drought_tolerance: "low",
    frost_tolerance: "moderate"
}),
new plantt({
    common_name: "Mint",
    scientific_name: "Mentha spicata",
    family: "Lamiaceae",
    planting_season: "spring",
    growth_period: "60-90 days",
    category: "herbs",
    preferred_soil: "moist, rich soil",
    ph_range: { min: 6, max: 7.5 },
    temperature_range: { min: 15, max: 25 },
    water_requirement: "high",
    light_requirement: "partial sun",
    drought_tolerance: "low",
    frost_tolerance: "moderate"
}),
new plantt({
    common_name: "Lettuce",
    scientific_name: "Lactuca sativa",
    family: "Asteraceae",
    planting_season: "cool season",
    growth_period: "30-60 days",
    category: "vegetables",
    preferred_soil: "loamy, rich in organic matter",
    ph_range: { min: 6, max: 7 },
    temperature_range: { min: 10, max: 20 },
    water_requirement: "high",
    light_requirement: "partial shade",
    drought_tolerance: "low",
    frost_tolerance: "moderate"
}),
]


async function seedPlants() {
for (let plant of newplants) {
    try {
        const exists = await plantt.findOne({
        scientific_name: plant.scientific_name
    });

    if (exists) {
        console.log("exists:", plant.common_name);
        continue;
    }
    await plant.save();
    console.log("saved:", plant.common_name);
    } catch (err) {
    console.log(err);
    }
}
process.exit();
}

seedPlants();

/*
new plantt({
    common_name:,
    scientific_name:,
    family:,
    planting_season:,
    growth_period:,
    category:,
    preferred_siol:,
    ph_range:,
    temperature_range:,
    water_requirement:,
    light_requirement:,
    drought_tolerance:,
    frost_tolerance:,
    
}),
*/
