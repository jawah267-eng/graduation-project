const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (model) => {
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);
    if (!document) {
      return next(new apiError(`no document for this id ${id}`, 404));
    }
    res.status(204).send();
  });
};
/////////////////////////////////////////////////////////////////////////////////////////
exports.updateOne = (model) => {
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new apiError(`no document for this id ${id}`, 404));
    }
    res.status(200).send();
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////
exports.createOne = (model) => {
  asyncHandler(async (req, res) => {
    const document = await model.create(req.body);

    res.status(201).send();
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////
exports.getOne = (model) => {
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);

    if (!document) {
      return next(new apiError(`no document for this id ${id}`, 404));
    }
    res.status(204).send();
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAll = (model) => {
  asyncHandler(async (req, res) => {
    // build query
    const { id } = req.params;
    const documentCounts = await model.countDocuments();
    const apiFeatures = new ApiFeatures(model.find(), req.query)
      .paginate(documentCounts)
      .filter()
      .search()
      .limitFields()
      .sort();
    // execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, pagenationResult, data: documents });
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////
