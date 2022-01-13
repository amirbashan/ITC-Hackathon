import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

import Requests from "../models/requests.js";
import Ride from "../models/rides.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const getAllRequests = getAll(Requests);
export const getRequests = getOne(Requests);
export const updateRequests = updateOne(Requests);
export const deleteRequests = deleteOne(Requests);
export const createRequest = createOne(Requests);

export const requestDefaults = catchAsync(async (req, res, next) => {
  const ride = await Ride.findById(req.params.rideId);

  if (!ride) {
    return next(new AppError("The ride ID does not exist", 400));
  }

  req.body.joinerId = req.user.id;
  req.body.rideId = req.params.rideId;
  next();
});
export const matchRideId = (req, res, next) => {
  req.query = { rideId: req.params.rideId };
  next();
};

export const filterMyRequests = (req, res, next) => {
  req.query = { joinerId: req.user._id };
  next();
};

export const cancelRequest = catchAsync(async (req, res, next) => {
  const request = await Requests.findById(req.params.id);
  if (!request) {
    return next(
      new AppError("The provided request ID is invalid or is incorrect", 400)
    );
  }
  const ride = await Ride.findById(request.rideId);

  if (!ride) {
    return next(
      new AppError(
        "This ride does not exist or the request has an invalid ride",
        400
      )
    );
  }

  if (ride.status !== 0) {
    return next(
      new AppError(
        "This request can no longer be canceled. Please check the ride status",
        400
      )
    );
  }

  if (request !== 0) {
    return next(
      new AppError(
        "This request can no longer be canceled. Please check the request status",
        400
      )
    );
  }
  //mongoose object Id
  if (req.user.id !== request.joinerId.toString()) {
    return next(
      new AppError("This is not the user that created this request", 400)
    );
  }

  req.body.status = 2;

  await ride.save();
  next();
});

export const matchRequest = catchAsync(async (req, res, next) => {
  const request = await Requests.findById(req.params.id);
  if (!request) {
    return next(
      new AppError("The provided request ID is invalid or is incorrect", 400)
    );
  }
  const ride = await Ride.findById(request.rideId);

  if (!ride) {
    return next(
      new AppError(
        "This ride does not exist or the request has an invalid ride",
        400
      )
    );
  }
  if (ride.status !== 0) {
    return next(new AppError("This ride is not available", 400));
  }
  //convert to mongoose object Id
  if (req.user.id !== ride.createdBy.toString()) {
    return next(
      new AppError("This is not the user who created this ride", 400)
    );
  }

  req.body.status = 1;

  ride.status = 1;
  ride.chosenRide = req.params.id;
  await ride.save();
  next();
});

export const cancelMatch = catchAsync(async (req, res, next) => {
  const request = await Requests.findById(req.params.id);
  if (!request) {
    return next(
      new AppError("The provided request ID is invalid or is incorrect", 400)
    );
  }
  const ride = await Ride.findById(request.rideId);
  if (ride.status !== 1) {
    return next(
      new AppError(
        "This ride has no match to cancel. (current status is not 1)",
        400
      )
    );
  }
  //convert to mongoose object Id
  if (req.user.id !== ride.createdBy.toString()) {
    return next(
      new AppError("This is not the user who created this ride", 400)
    );
  }
  if (ride.chosenRide.toString() !== req.params.id) {
    return next(
      new AppError("This is not the request that is matched to this ride", 400)
    );
  }

  req.body.status = 0;

  ride.status = 0;
  ride.chosenRide = null;

  await ride.save();
  next();
});

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) {
//       newObj[el] = obj[el];
//     }
//   });
//   return newObj;
// };
