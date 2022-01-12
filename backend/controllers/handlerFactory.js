import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/AppError.js";
import ApiFeatures from "./../utils/ApiFeatures.js";

export const createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  });
};

export const getAll = (Model, populateOptions) => {
  return catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .populate(populateOptions);

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      requestTime: req.requestTime,
      data: {
        data: doc,
      },
    });
  });
};

export const getOne = (Model, populateOptions, selectOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    if (selectOptions) {
      query = query.select(selectOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

export const updateOne = (Model, populateOptions, selectOptions) => {
  return catchAsync(async (req, res, next) => {
    const query = Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (populateOptions) {
      query.populate(populateOptions);
    }
    if (selectOptions) {
      query.select(selectOptions);
    }

    const doc = await query;
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
