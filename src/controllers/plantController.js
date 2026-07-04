const mongoose = require("mongoose");
const asynchandler = require("express-async-handler"); // مشان نكشف الاخطاء
const plantService = require("../services/plantService");

//مشان ضيف نبتة مع صورة وتحديد الشخص الذي قام بالادخال
exports.createPlant = asynchandler(async (req, res) => {
  if (!req.body.common_name) {
    //  التأكد من وجود اسم النبتة
    return res.status(400).json({ message: "Plant name is required" });
  }
  // لتاكد من وجود الصورة
  const images = req.files
    ? req.files.map((file) => ({
        url: file.path,
      }))
    : [];
  //يضيف اصناف النبتة
  const plant = await plantService.createPlant({
    ...req.body,
    images,
    // owner: req.user.id,
  });

  res.status(201).json(plant);
});
///////////////////////////////////////////////////////////////////////////////////////////
//مشان رجع كل النباتات
exports.getallplant = asynchandler(async (req, res) => {
  // هون عم نحدد الصفحة والعدد من req
  const page = Math.max(1, req.query.page * 1 || 1); //عشان ما حدا يبعث page = 0 أو رقم سالب.
  const limit = req.query.limit * 1 || 5;
  //وعملنا total
  //مشان الفرونت يعرف عدد الصفحات الكلي
  const { plants, total } = await plantService.getAllPlants({ page, limit });
  res.status(200).json({
    results: plants.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: plants,
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////
//بدي اعمل get specific plant
//رجع حسب ال   -1 id
exports.getplant = asynchandler(async (req, res) => {
  const { id } = req.params;
  // اذا بعت المستخدم ال id غلط
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const category = await plantService.getplant(id);
  if (!category) {
    return res
      .status(404)
      .json({ message: `Plant not found for this id ${id}` });
  }
  res.status(200).json(category);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

// بدي رجع حسب الاسم الشائع  -2
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//بدي اضيف اصناف النبتة
exports.createVariety = asynchandler(async (req, res) => {
  const plantId = req.params.id;
  console.log("BODY =>", req.body);
  console.log("PLANT ID:", plantId);
  const variety = await plantService.createVariety({
    ...req.body,
    plant_id: plantId,
  });

  res.status(201).json(variety);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//بدي عدل على اصناف النبتة حسب idتبعا
exports.updateSpecificCategory = asynchandler(async (req, res) => {
  const { plantId, varietyId } = req.params;

  console.log("plantId:", plantId);
  console.log("varietyId:", varietyId);
  const update = await plantService.updateVariety(varietyId, req.body);
  if (!update)
    res.status(404).json({ msg: `No Category for this id ${varietyId}` });
  res.status(200).json({ data: update });
});
/////////////////////////////////////////////////////////////////////////////////////////
//بدي احذف صنف حسب id
exports.deleteSpecificCategory = asynchandler(async (req, res) => {
  const { varietyId } = req.params;
  const delet = await plantService.deleteVariety(varietyId);
  if (!delet)
    res.status(404).json({ msg: `No Category for this id ${varietyId}` });
  res.status(204).send();
});

/////////////////////////////////////////////////////////////////////////////////////////////
//بدي عدل category الاب حسب ال id

// تعديل Category الأب (Plant)
exports.updateCategory = asynchandler(async (req, res) => {
  const { plantId } = req.params;

  const updatedCategory = await plantService.updatePlant(plantId, req.body);

  if (!updatedCategory) {
    return res
      .status(404)
      .json({ msg: `No Category found with id ${plantId}` });
  }

  res.status(200).json({
    success: true,
    data: updatedCategory,
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////

exports.deleteCategory = asynchandler(async (req, res) => {
  const { plantId } = req.params;

  const deletedCategory = await plantService.deletePlant(plantId);

  if (!deletedCategory) {
    return res
      .status(404)
      .json({ msg: `No Category found with id ${plantId}` });
  }

  res.status(204).json({
    success: true,
    msg: "Category deleted successfully",
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////
exports.getVarietiesByPlant = asynchandler(async (req, res) => {
  const { plantId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const varieties = await plantService.getVarietiesByPlant(plantId);

  if (!varieties) {
    return res
      .status(404)
      .json({ message: `Plant not found for this id ${plantId}` });
  }
  res.status(200).json(varieties);
});
