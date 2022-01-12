import Pet from "../models/petModel.js";
import AppError from "./../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Adoption from "./../models/adoptionModel.js";
import { createOne, getAll, getOne, updateOne } from "./handlerFactory.js";

export const createAdoptionEvent = createOne(Adoption);
export const updateAdoptionEvent = updateOne(Adoption);
export const getAllAdoptions = getAll(Adoption, [
  { path: "user", select: "name email phoneNumber" },
  { path: "pet", select: "name type breed" },
]);
export const getAdoption = getOne(Adoption, [
  { path: "user", select: "name email phoneNumber" },
  { path: "pet", select: "name type breed" },
]);

export const adoptionStats = catchAsync(async (req, res, next) => {
  const adoptionStats = await Adoption.aggregate([
    {
      $group: {
        _id: "$currentStage",
        amount: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      adoptionStats,
    },
  });
});

//TODO aggregate options for pets using tour example

// export const getTourStats = catchAsync(async (req, res, next) => {
//   const stats = await Tour.aggregate([
//     { $match: { ratingsAverage: { $gte: 4.5 } } },
//     {
//       $group: {
//         _id: { $toUpper: "$difficulty" },
//         numRatings: { $sum: "$ratingsQuantity" },
//         numTours: { $sum: 1 },
//         avgRating: { $avg: "$ratingsAverage" },
//         avgPrice: { $avg: "$price" },
//         minPrice: { $min: "$price" },
//         maxPrice: { $max: "$price" },
//       },
//     },
//     {
//       $sort: {
//         avgPrice: -1,
//       },
//     },
//   ]);

//   res.status(200).json({
//     status: "success",
//     data: {
//       stats,
//     },
//   });
// });

// export const getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = +req.params.year;
//   const plan = await Tour.aggregate([
//     { $unwind: "$startDates" },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: "$startDates" },
//         numTourStarts: { $sum: 1 },
//         tours: { $push: "$name" },
//       },
//     },
//     {
//       $addFields: { month: "$_id" },
//     },
//     {
//       $project: {
//         _id: 0,
//       },
//     },
//     {
//       $sort: { numTourStarts: -1 },
//     },
//     {
//       $limit: 12,
//     },
//   ]);

//   res.status(200).json({
//     status: "success",
//     data: {
//       plan,
//     },
//   });
// });

export const filterAdoptions = catchAsync(async (req, res, next) => {
  let { fields } = req.query;
  fields = fields ? fields + " -stageHistory" : "-stageHistory";
  req.query.fields = fields;
  next();
});

export const filterPendingRequestAdoptions = catchAsync(
  async (req, res, next) => {
    let { fields } = req.query;
    fields = fields ? fields + " -stageHistory" : "-stageHistory";
    req.query.fields = fields;
    req.query.currentStage = [1, 4, 6];
    req.query.isActive = "true";
    next();
  }
);
export const filterAdoption = catchAsync(async (req, res, next) => {
  req.params.id = req.params.adoptionId;
  next();
});

export const adoptPet = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.pet = req.params.petId;

  next();
});

export const returnPet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findById(req.params.petId);
  const adoptionEvent = await Adoption.findById(pet.currentAdoptionEvent);
  if (pet.adoptionStatus !== 2 && pet.adoptionStatus !== 3) {
    return next(new AppError("This pet is not available for return", 400));
  }

  if (req.user.id !== pet.currentOwner.toString()) {
    return next(new AppError("This is not the user who owns this pet", 400));
  }

  req.params.id = pet.currentAdoptionEvent;
  req.body.currentStage = 4;
  req.body.currentStageDate = Date.now();
  const newHistory = [...adoptionEvent.stageHistory];
  newHistory.push({
    stage: adoptionEvent.currentStage,
    date: adoptionEvent.currentStageDate,
  });
  req.body.stageHistory = newHistory;

  pet.adoptionStatus = 4;
  await pet.save();
  next();
});

export const adoptFromFoster = catchAsync(async (req, res, next) => {
  const pet = await Pet.findById(req.params.petId);
  const adoptionEvent = await Adoption.findById(pet.currentAdoptionEvent);
  if (pet.adoptionStatus !== 3) {
    return next(new AppError("This pet is not eligible to be adopted", 400));
  }
  if (req.user.id !== pet.currentOwner.toString()) {
    return next(new AppError("This is not the user who owns this pet", 400));
  }

  req.params.id = pet.currentAdoptionEvent;
  req.body.currentStage = 6;
  req.body.currentStageDate = Date.now();
  adoptionEvent.stageHistory.push({
    stage: 3,
    date: adoptionEvent.currentStageDate,
  });
  req.body.stageHistory = adoptionEvent.stageHistory;

  pet.adoptionStatus = 6;
  await pet.save();
  next();
});

export const approveStage = catchAsync(async (req, res, next) => {
  const { adoptionId } = req.params;
  const adoptionEvent = await Adoption.findById(adoptionId);
  const pet = await Pet.findById(adoptionEvent.pet);
  req.params.id = pet.currentAdoptionEvent;

  switch (pet.adoptionStatus) {
    case 1:
      req.body.currentStage = adoptionEvent.type;
      adoptionEvent.stageHistory.push({
        stage: 1,
        date: adoptionEvent.currentStageDate,
      });
      req.body.stageHistory = adoptionEvent.stageHistory;

      pet.adoptionStatus = req.body.currentStage;
      pet.adoptionType = adoptionEvent.type;
      break;
    case 4:
      req.body.currentStage = 5;
      req.body.currentStageDate = Date.now();
      req.body.isActive = false;
      adoptionEvent.stageHistory.push({
        stage: 4,
        date: adoptionEvent.currentStageDate,
      });
      req.body.stageHistory = adoptionEvent.stageHistory;

      pet.adoptionStatus = 0;
      pet.currentOwner = null;
      pet.currentAdoptionEvent = null;
      pet.adoptionType = null;
      break;
    case 6:
      req.body.currentStage = 2;
      req.body.type = 2;
      req.body.currentStageDate = Date.now();
      adoptionEvent.stageHistory.push({
        stage: 6,
        date: adoptionEvent.currentStageDate,
      });
      req.body.stageHistory = adoptionEvent.stageHistory;

      pet.adoptionStatus = 2;
      pet.adoptionType = 2;
      break;
    default:
      return next(
        new AppError(
          "Cannot approve the request. Please check the stage this adoption event is currently in or the adoption status of the pet."
        )
      );
  }

  await pet.save();
  next();
});

export const rejectStage = catchAsync(async (req, res, next) => {
  const { adoptionId } = req.params;
  const adoptionEvent = await Adoption.findById(adoptionId);

  const pet = await Pet.findById(adoptionEvent.pet);
  req.params.id = pet.currentAdoptionEvent;

  switch (pet.adoptionStatus) {
    case 1:
      await Adoption.deleteOne(adoptionEvent);
      pet.currentOwner = null;
      pet.currentAdoptionEvent = null;
      pet.adoptionStatus = 0;
      pet.adoptionType = 0;
      await pet.save();

      return res.status(201).send();
    case 4:
      req.body.currentStage = adoptionEvent.type;
      req.body.currentStageDate = Date.now();
      adoptionEvent.stageHistory.push({
        stage: 4,
        date: adoptionEvent.currentStageDate,
      });

      req.body.stageHistory = adoptionEvent.stageHistory;
      pet.adoptionStatus = req.body.currentStage;

      break;
    case 6:
      req.body.currentStage = 3;
      req.body.currentStageDate = Date.now();
      adoptionEvent.stageHistory.push({
        stage: 6,
        date: adoptionEvent.currentStageDate,
      });
      req.body.stageHistory = adoptionEvent.stageHistory;

      pet.adoptionStatus = 3;

      break;
    default:
      return next(
        new AppError(
          "Cannot reject the request. Please check the stage this adoption event is currently in or the adoption status of the pet."
        )
      );
  }

  await pet.save();
  next();
});
