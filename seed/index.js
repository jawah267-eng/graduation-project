const db=require("../server");
const mongoose=require("mongoose");


//هون انا عملت map حطيت فيها انواع النباتات وشو ممكن تتعرض لأمراض مع نسب متوسطة للحساسية 
const susceptibilityMap = {
    زينة: {
        fungal: 75,
        bacterial: 60,
        pest: 50
    },
    اعشاب: {
        fungal: 70,
        bacterial: 55,
        pest: 65
    },
    vegetables: {
        fungal: 80,
        bacterial: 70,
        pest: 75
    },
    fruit: {
        fungal: 85,
        bacterial: 65,
        pest: 70
    }
};
/*
mapهون عملت التابع كرمال استدعي ال
اول قسم بجيب نوع النبتة 
تاني قسم بجيب نوع المرض
*/
function calculetDiseasPlant(plant, diseas) {
    return susceptibilityMap[plant.category]?.[diseas.diseasestype] || 50;
};

module.exports={ calculetDiseasPlant}