import mongoose from "mongoose";
import AppError from "./../utils/AppError.js";
import Pet from "./petModel.js";
const adoptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An adoption must be made by a user"],
  },
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: "Pet",
    required: [true, "The adopted pet must be specified"],
  },
  type: {
    type: Number,
    enum: {
      values: [2, 3],
      message:
        "Please select a valid adoption type (2 or 3) according to the adoption types definitions (see docs)",
    },
    required: [true, "An adoption must have a type"],
  },
  returnDate: {
    type: Date,
    // required: [
    //   function () {
    //     return this.type === "fostered";
    //   },
    //   "If a pet is fostered then a return date must be specified",
    // ],
  },
  isActive: { type: Boolean, default: true },
  currentStage: {
    type: Number,
    default: 1,
    enum: {
      values: [1, 2, 3, 4, 5, 6, 7, 8],
      message:
        "Please select a valid number from 1-8 according to the stages definitions (see docs)",
    },
  },
  currentStageDate: {
    type: Date,
    default: Date.now(),
  },
  stageHistory: {
    type: [Object],
  },
});

adoptionSchema.pre("save", async function (next) {
  const pet = await Pet.findById(this.pet);
  if (pet.adoptionStatus === 0) {
    pet.adoptionStatus = 1;
    pet.currentOwner = this.user;
    pet.currentAdoptionEvent = this;
    try {
      await pet.save();
    } catch (err) {
      console.log(err);
    }
    next();
  } else {
    return next(new AppError("This pet is not available", 400));
  }
  next();
});

export default mongoose.model("Adoption", adoptionSchema);
