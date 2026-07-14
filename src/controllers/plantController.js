const mongoose = require("mongoose");
const asynchandler = require("express-async-handler"); // مشان نكشف الاخطاء
const plantService = require("../services/plantService");
const ApiError = require("../utils/apiError");
//مشان ضيف نبتة مع صورة وتحديد الشخص الذي قام بالادخال
exports.createPlant = asynchandler(async (req, res, next) => {
  if (!req.body.common_name) {
    //  التأكد من وجود اسم النبتة
    // return res.status(400).json({ message: "Plant name is required" });
    return next(new ApiError("Plant name is required", 400));
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
//بدي اعمل get  plant
//رجع حسب ال   -1 id
exports.getplant = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  // اذا بعت المستخدم ال id غلط
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid ID", 400));
  }
  const category = await plantService.getplant(id);
  if (!category) {
    // return res
    //   .status(404)
    //   .json({ message: `Plant not found for this id ${id}` });
    return next(new ApiError(`Plant not found for this id ${id}`, 404));
  }
  res.status(200).json(category);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

// بدي رجع حسب الاسم الشائع  -2
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//بدي اضيف اصناف النبتة
exports.createVariety = asynchandler(async (req, res, next) => {
  const plantId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return next(new ApiError("Invalid ID", 400));
  }

  const plant = await plantService.getplant(plantId);

  if (!plant) {
    return next(new ApiError("Plant not found", 404));
  }
  // console.log("BODY =>", req.body);
  // console.log("PLANT ID:", plantId);
  const variety = await plantService.createVariety({
    ...req.body,
    plant_id: plantId,
  });

  res.status(201).json(variety);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//بدي عدل على اصناف النبتة حسب idتبعا
exports.updateSpecificCategory = asynchandler(async (req, res, next) => {
  const { varietyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(varietyId)) {
    return next(new ApiError("Invalid ID", 400));
  }
  console.log("varietyId:", varietyId);
  const update = await plantService.updateVariety(varietyId, req.body);
  if (!update)
    return next(new ApiError(`No Category for this id ${varietyId}`, 404));

  res.status(200).json({ data: update });
});
/////////////////////////////////////////////////////////////////////////////////////////
//بدي احذف صنف حسب id
exports.deleteSpecificCategory = asynchandler(async (req, res) => {
  const { varietyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(varietyId)) {
    return next(new ApiError("Invalid ID", 400));
  }
  const delet = await plantService.deleteVariety(varietyId);
  if (!delet)
    return next(new ApiError(`No Category for this id ${varietyId}`, 404));
  res.status(204).send();
});

/////////////////////////////////////////////////////////////////////////////////////////////
//بدي عدل category الاب حسب ال id

// تعديل Category الأب (Plant)
exports.updateCategory = asynchandler(async (req, res, next) => {
  const { plantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return next(new ApiError("Invalid ID", 400));
  }
  const updatedCategory = await plantService.updatePlant(plantId, req.body);

  if (!updatedCategory) {
    return next(new ApiError(`No Category found with id ${plantId}`, 404));
  }

  res.status(200).json({
    success: true,
    data: updatedCategory,
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////
// بدي احذف  نبتة الاب
exports.deleteCategory = asynchandler(async (req, res, next) => {
  const { plantId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return next(new ApiError("Invalid ID", 400));
  }
  const deletedCategory = await plantService.deletePlant(plantId);

  if (!deletedCategory) {
    return next(new ApiError(`No Category found with id ${plantId}`, 404));
  }
  res.status(200).json({
    success: true,
    msg: "Category deleted successfully",
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////
//بدي جيب اصناف نبتة معينة
exports.getVarietiesByPlant = asynchandler(async (req, res, next) => {
  console.log("getVarietiesByPlant called");
  console.log(req.params);
  const { plantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return next(new ApiError("Invalid ID", 400));
  }
  const plant = await plantService.getplant(plantId);

  if (!plant) {
    return next(new ApiError(`Plant not found for this id ${plantId}`, 404));
  }
  const varieties = await plantService.getVarietiesByPlant(plantId);

  res.status(200).json(varieties);
});
