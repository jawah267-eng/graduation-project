const db=require("../server");
const dises_pl=require("../src/models/diseases_plant");
const diseas=require("../src/models/diseases");
const plant=require("../src/models/plants");
const t=require("./index");



/*
هون عملت تابع حطيت فيه لائحة فارغة بالبداية بعدا بجيب بيانات النبات و الامراض وبعمل حلقة متداخلة وبستدعي 
التابع لي عملته بملف index
وبكل لفة بضيف لائحة 
بعدا بعملن ضمن insertmany 
مشان ابعتن كطلب واحد
*/
async function seedDiseasPlant() {
    const relations = [];

const plants = await plant.find();
const diseases = await diseas.find();

for (const p of plants) {
    for (const d of diseases) {

        const susceptibility = t.calculetDiseasPlant(p, d);

        relations.push({
            plant_id: p._id,
            diseases_id: d._id,
            susceptibility: susceptibility
        });
    }
}
await dises_pl.insertMany(relations);

console.log(" Data inserted successfully");
}
seedDiseasPlant();