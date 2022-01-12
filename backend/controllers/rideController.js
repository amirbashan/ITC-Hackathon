import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Ride from "../models/rides.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import { application } from "express";

export const getAllRides = getAll(Ride);
export const getRide = getOne(Ride);
export const createRide = createOne(Ride);
export const updateRide = updateOne(Ride);

export const rideDefaults = (req, res, next) => {
  req.body.createdBy = req.user.id;
  next();
};

export const getRidesWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitude and longitude in the format lat,lng.",
        400
      )
    );
  }

  const radius = unit === "miles" ? distance / 3963.2 : distance / 6378.1;
  const rides = await Ride.find({
    pickUp: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  console.log(distance, lat, lng, unit);
  res.status(200).json({
    status: "success",
    results: rides.length,
    data: { data: rides },
  });
});

// export const deleteRide = deleteRide(Ride);
