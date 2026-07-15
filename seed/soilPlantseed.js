const db = require("../server");

const Plant = require("../src/models/plants");
const SoilType = require("../src/models/soiltypes");
const SoilPlant = require("../src/models/soil_plant");

const relations = [
  {
    plant: "بطاطا",
    soils: ["loamy"],
  },
  {
    plant: "بامياء",
    soils: ["loamy"],
  },
  {
    plant: "بازلاء",
    soils: ["loamy"],
  },
  {
    plant: "ثوم",
    soils: ["loamy"],
  },
  {
    plant: "بصل",
    soils: ["sandy", "clay"],
  },
  {
    plant: "ذرة صفراء",
    soils: ["loamy", "clay"],
  },
  {
    plant: "ذرة بيضاء",
    soils: ["loamy"],
  },
  {
    plant: "خيار",
    soils: ["loamy", "sandy"],
  },
  {
    plant: "بطيخ أحمر",
    soils: ["clay", "sandy", "loamy"],
  },
  {
    plant: "بطيخ أصفر",
    soils: ["loamy", "sandy"],
  },
  {
    plant: "قمح",
    soils: ["clay", "sandy"],
  },
  {
    plant: "قطن",
    soils: ["loamy"],
  },
  {
    plant: "جزر",
    soils: ["loamy", "sandy", "silty"],
  },
  {
    plant: "ملوخية",
    soils: ["clay"],
  },
  {
    plant: "فليفلة",
    soils: ["loamy"],
  },
  {
    plant: "ملفوف",
    soils: ["loamy", "clay"],
  },
  {
    plant: "بندورة",
    soils: ["loamy", "sandy"],
  },
  {
    plant: "حمص",
    soils: ["loamy"],
  },
  {
    plant: "شوندر سكري",
    soils: ["loamy"],
  },
  {
    plant: "تفاح",
    soils: ["loamy"],
  },
  {
    plant: "الكرز الحلو",
    soils: ["sandy", "clay"],
  },
  {
    plant: "التين",
    soils: ["clay", "sandy"],
  },
  {
    plant: "التوت",
    soils: ["sandy", "clay"],
  },
  {
    plant: "الدراق",
    soils: ["clay", "sandy"],
  },
  {
    plant: "الفراولة",
    soils: ["loamy"],
  },
  {
    plant: "كرمة (عنب مائدة)",
    soils: ["loamy", "sandy", "clay"],
  },
  {
    plant: "الجوز",
    soils: ["loamy"],
  },
  {
    plant: "مشمش",
    soils: ["loamy"],
  },
  {
    plant: "أكيدنيا (مشمش هندي)",
    soils: ["loamy", "sandy", "clay"],
  },
  {
    plant: "خوخ",
    soils: ["loamy"],
  },
  {
    plant: "كيوي",
    soils: ["loamy"],
  },
  {
    plant: "زيتون",
    soils: ["loamy"],
  },
  {
    plant: "عنب",
    soils: ["loamy"],
  },
  {
    plant: "عباد الشمس",
    soils: ["loamy"],
  },
  {
    plant: "لوز",
    soils: ["loamy"],
  },
  {
    plant: "حمضيات (متعددة الأصناف)",
    soils: ["clay", "loamy", "sandy"],
  },
  {
    plant: "كينا",
    soils: ["loamy", "sandy"],
  },
  {
    plant: "سفرجل",
    soils: ["loamy"],
  },
  {
    plant: "السرو الدائم الخضرة",
    soils: ["loamy", "sandy"],
  },
  {
    plant: "الرمان",
    soils: ["sandy", "loamy"],
  },
  {
    plant: "جلد النمر",
    soils: ["sandy"],
  },
];

async function seedSoilPlant() {
  try {
    for (const item of relations) {
      const plant = await Plant.findOne({
        common_name: item.plant,
      });

      if (!plant) {
        console.log(`Plant not found: ${item.plant}`);
        continue;
      }

      for (const soilType of item.soils) {
        const soil = await SoilType.findOne({
          types: soilType,
        });

        if (!soil) {
          console.log(`Soil type not found: ${soilType}`);
          continue;
        }

        await SoilPlant.create({
          plant_id: plant._id,
          soil_id: soil._id,
        });

        console.log(`${item.plant} -> ${soilType}`);
      }
    }

    console.log("Seed completed successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedSoilPlant();
