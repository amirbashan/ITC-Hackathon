import ApiFeatures from "./../utils/ApiFeatures.js";
import User from "./../models/userModel.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";
import Pet from "../models/petModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export const imageUploader = catchAsync(async (req, res, next) => {
  if (req.file) {
    const image = await uploadToCloudinary(req.file.path);
    fs.unlinkSync(req.file.path);
    req.body.photo = image.url;
  }
  next();
});

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.email) {
    return next(new AppError("This route is not for email updates.", 400));
  }
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "bio",
    "phoneNumber",
    "photo"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const getAllUsers = getAll(User);
const getUser = getOne(User);
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined. Please use /signup instead",
  });
};

const savePet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findById(req.params.petId);
  if (!pet) {
    return next(new AppError("Cannot find the pet with this Id", 400));
  }
  req.params.id = req.user.id;
  req.body = { $addToSet: { savedPets: req.params.petId } };
  next();
});

const deleteSavedPet = (req, res, next) => {
  req.params.id = req.user.id;
  req.body = { $pull: { savedPets: req.params.petId } };
  next();
};

const getUserSavedPets = getOne(User, "savedPets", "savedPets");

export {
  getAllUsers,
  updateMe,
  deleteMe,
  getMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  savePet,
  deleteSavedPet,
  getUserSavedPets,
};
