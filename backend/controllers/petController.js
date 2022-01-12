import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Pet from "./../models/petModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

export const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price";
  next();
};

export const getAllPets = getAll(Pet);
export const getPet = getOne(Pet);
export const createPet = createOne(Pet);
export const updatePet = updateOne(Pet);
export const deletePet = deleteOne(Pet);
export const getUserPets = getAll(Pet);

export const setFilterForUser = (req, res, next) => {
  req.query = { currentOwner: req.params.userId };
  next();
};

export const imageUploader = catchAsync(async (req, res, next) => {
  if (req.file) {
    const image = await uploadToCloudinary(req.file.path);
    fs.unlinkSync(req.file.path);
    req.body.imageCover = image.url;
  }
  next();
});
