const db=require("../server");
const soiltype=require("../src/models/soiltypes");

let newsoiltypes=[

    new soiltype({
    name:"تربة رملية",
    phlevel:{ min: 5.5, max: 7.5 },
    description:"تربة خفيفة سريعة التصريف، لا تحتفظ بالماء، مناسبة للنباتات الصحراوية.",
    types:"sandy",
    }),

    new soiltype({
    name:"تربة طينية",
    phlevel:{ min: 6, max: 8 },
    description:"تربة ثقيلة تحتفظ بالماء لفترة طويلة، غنية بالعناصر الغذائية.",
    types:"clay",
    }),

    new soiltype({
    name:"تربة طميية",
    phlevel:{ min: 6, max: 7.5 },
    description:"أفضل تربة للزراعة، توازن بين الاحتفاظ بالماء والتصريف.",
    types:"loamy",
    }),


    new soiltype({
    name:"تربة غرينية",
    phlevel:{ min: 6, max: 7.5 },
    description:"غنية بالمواد العضوية، حمضية جدًا، تستخدم للنباتات التي تحب الحموضة.",
    types:"silty",
    }),

    new soiltype({
    name: "تربة خثية",
    phlevel: { min: 3.5, max: 5.5 },
    description: "غنية بالمواد العضوية، حمضية جدًا، تستخدم للنباتات التي تحب الحموضة.",
    types: "peat"
}),

]
async function seedsoil() {
    for(let soil of newsoiltypes)
        try{
        await soil.save();
        console.log("saved:",soil.common_name);
    } catch(err){
        console.log(err);
    }
    process.exit();  
}
seedsoil();