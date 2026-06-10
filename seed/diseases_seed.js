const db=require("../server");
const diseas=require("../src/models/diseases");

//نوع المرض
//الاعراض
//طرق الوقاية
//طرق العلاج
//موسم الانتشار
//بالملف هاد بس بدخل انواع الامراض الاكثر انتشارا 
let newdiseases=[
    new diseas({
    name:"Aphids",
    diseasestype:"pest",
    symptoms:"حشرات صغيرة على النموات الجديدة، تجعد الأوراق",
    prevention:"تنظيف النبات وفحصه دورياً",
    treatment:"رش صابون حشري أو زيت النيم",
    peak_season:"spring",
    }),
    new diseas({
    name:"Sooty Mold",
    diseasestype:"fungal",
    symptoms:"طبقة سوداء على الأوراق",
    prevention:"مكافحة الحشرات المسببة مثل المن",
    treatment:"تنظيف الأوراق واستخدام مبيد فطري",
    peak_season:"summer",
    }),
    new diseas({
    name: "Bacterial Leaf Spot",
    diseasestype: "bacterial",
    symptoms: "بقع مائية داكنة على الأوراق",
    prevention: "تقليل الرطوبة العالية",
    treatment: "إزالة الأوراق المصابة واستخدام مبيد بكتيري",
    peak_season: "summer"}),
    
    new diseas({
    name: "Spider Mites Infestation",
    diseasestype: "pest",
    symptoms: "اصفرار، خيوط دقيقة، جفاف الأوراق",
    prevention: "رفع الرطوبة وتنظيف الأوراق",
    treatment: "استخدام صابون حشري أو زيت النيم",
    peak_season: "summer"
    }),
    new diseas({
    name: "Leaf Blight",
    diseasestype:"fungal",
    symptoms: "احتراق أطراف الأوراق وبقع بنية",
    prevention: "تهوية جيدة وعدم رش الأوراق بكثرة",
    treatment: "إزالة الأجزاء المصابة واستخدام مبيد فطري",
    peak_season: "spring"
    }),
    new diseas({
    name: "Powdery Mildew",
    diseasestype:"fungal",
    symptoms: "طبقة بيضاء على الأوراق",
    prevention: "تعريض النبات للشمس وتهوية جيدة",
    treatment: "استخدام مبيد فطري",
    peak_season: "spring"
    }),
    new diseas({
    name: "Whiteflies",
    diseasestype: "pest",
    symptoms: "حشرات بيضاء صغيرة، اصفرار الأوراق",
    prevention: "فحص النبات باستمرار",
    treatment: "استخدام صابون حشري أو مبيد حشري",
    peak_season: "summer"
    }),
    new diseas({
    name: "Root Rot",
    diseasestype:"fungal",
    symptoms: "اصفرار الأوراق وذبولها رغم رطوبة التربة، وجذور طرية بنية/سوداء، وتوقف النمو، ورائحة كريهة من التربة",
    prevention: "تجنب الإفراط في الري، وتأكد من تصريف المياه بشكل صحيح، واستخدم تربة جيدة التصريف، وعقم الأواني والأدوات، وتجنب تشبع التربة بالماء.",
    treatment: "أزل الجذور المصابة، وأعد زراعة النبتة في تربة جافة جديدة، وقلل الري، واستخدم مبيدًا للفطريات",
    peak_season: "winter"
    }),
    new diseas({
    name: "fungal Leaf Spot",
    diseasestype:"fungal",
    symptoms: "بقع دائرية بنية أو سوداء على الأوراق، هالات صفراء حول البقع، اصفرار الأوراق وتساقطها المبكر",
    prevention: "تجنب الري من الأعلى، وحسّن دوران الهواء، وتجنب تكدس النباتات، واستخدم مياه ري نظيفة، وأزل الأوراق المصابة فوراً.",
    treatment: "إزالة الأوراق المصابة، واستخدم مبيد فطري نحاسي أو مبيد فطري جهازي، وقلل الرطوبة، وتجنب تبليل الأوراق",
    peak_season: "spring"}),




];
async function seedDiseas() {
    for(let dis of newdiseases)
        try{
        await diseas.updateOne(
        { name: dis.name },   // الشرط (ما يتكرر)
        { $setOnInsert: dis }, // إذا مش موجود أضفه
        { upsert: true }       // أهم شيء
    );
    console.log("saved:",dis.name);
    } catch(err){
        console.log(err);
    }
    process.exit(); 
}
seedDiseas();

