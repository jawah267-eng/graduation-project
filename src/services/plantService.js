const slugify = require("slugify");
const plant = require("../models/plants");
const Variety = require("../models/Variety-plant");

// @createplant تابع لاضافة نبتة من postmanمن خلال req.body
//@rote   post: api/v1/plants
// @access private
const createPlant = async (data) => {
  if (data.common_name) {
    data.slug = slugify(data.common_name, { lower: true });
  }
  const newplant = new plant(data);
  return await newplant.save();
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*بدنا  تعمل تابع getallplant
بجيب كل النباتات من 
الpostman
*/
// @get a list of plants
// @rote  get: api/v1/plants
//@access public
const getAllPlants = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const [plants, total] = await Promise.all([
    plant.find({}).skip(skip).limit(limit).populate("varieties"),
    plant.countDocuments(),
  ]);
  return { plants, total };
};
// @get   plants by id
// @rote  get: api/v1/plants/:id
//@access public
//نجيب النبتة حسب id من mongoose باستخدامfindById
const getplant = async (id) => {
  return await plant.findById(id).populate("varieties");
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// @post create specific plants
//@rote  post: api/v1/plants/:id/varieties
//
const createVariety = async (data) => {
  if (!data.common_name) {
    throw new Error("Variety name is required");
  }

  const plantt = await plant.findOne({ _id: data.plant_id });

  if (!plantt) {
    throw new Error("Plant not found");
  }

  const newVariety = await Variety.create({
    common_name: data.common_name,
    slug: slugify(data.common_name, { lower: true }),
    plant_id: plantt._id,
    type: data.type,
    characteristics: data.characteristics || {},
    harvest_time: data.harvest_time,
    images: data.images || [],
  });

  return newVariety;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//@put updet specific plants
//@rote put: api/v1/plants/:id/varieties/varietie:id
// access private
const updateVariety = async (id, newdata) => {
  if (newdata.common_name) {
    newdata.slug = slugify(newdata.common_name, {
      lower: true,
      strict: true,
    });
  }

  return await Variety.findOneAndUpdate({ _id: id }, newdata, {
    returnDocument: "after",
    runValidators: true,
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//@delete  delete specific plants
//@rote del: api/v1/plants/:id/varieties/varietie:id
// access private

const deleteVariety = async (data) => {
  return await Variety.findByIdAndDelete(data);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//@put updet  plants
//@rote put: api/v1/plants/:id
// access private

const updatePlant = async (plantId, data) => {
  return await plant.findByIdAndUpdate(plantId, data, {
    new: true,
    runValidators: true,
  });
};
//////////////////////////////////////////////////////////////////////
const deletePlant = async (plantId) => {
  return await plant.findByIdAndDelete(plantId);
};
/////////////////////////////////////////////////////////////////////

// @get   specific plants by id
// @rote  get: /api/v1/plants/:plantId/varieties
//@access public
//نجيب النبتة حسب id من mongoose باستخدامfindById

const getVarietiesByPlant = async (data) => {
  return await Variety.find({ plant_id: data });
};

module.exports = {
  getAllPlants,
  createPlant,
  getplant,
  createVariety,
  updateVariety,
  deleteVariety,
  updatePlant,
  deletePlant,
  getVarietiesByPlant,
};
