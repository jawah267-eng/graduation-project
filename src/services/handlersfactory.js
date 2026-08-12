const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// Delete One
exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }

    res.status(204).send();
  });

// Update One
exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: document,
    });
  });

// Create One
exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    const document = await model.create(req.body);

    res.status(201).json({
      status: "success",
      data: document,
    });
  });

// Get One
exports.getOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findById(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: document,
    });
  });

// Get All
exports.getAll = (model) =>
  asyncHandler(async (req, res) => {
    // Count documents
    const documentCounts = await model.countDocuments();

    // Build query
    const apiFeatures = new ApiFeatures(model.find(), req.query)
      .paginate(documentCounts)
      .filter()
      .search()
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;

    const documents = await mongooseQuery;

    res.status(200).json({
      status: "success",
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });
