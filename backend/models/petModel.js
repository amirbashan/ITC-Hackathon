import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "A pet must have a name"],
      maxLength: [20, "A pet name can't have more than 40 characters"],
    },
    adoptionStatus: {
      type: Number,
      required: [true, "A pet must have a status."],
      default: 0,
      enum: {
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        message:
          "Please select a valid number from 1-8 according to the stages definition. (see docs)",
      },
    },
    currentAdoptionEvent: { type: mongoose.Schema.ObjectId, ref: "Adoption" },
    currentOwner: { type: mongoose.Schema.ObjectId, ref: "User" },
    adoptionType: {
      type: Number,
      enum: {
        values: [0, 2, 3],
        message:
          "Please select a valid adoption type (2 or 3) according to the adoption types definitions (see docs)",
      },
      default: 0,
    },
    type: {
      type: String,
      lowercase: true,
      required: [true, "A pet must have a type"],
      maxLength: [20, "A pet type can't have more than 40 characters"],
    },
    breed: {
      type: String,
      lowercase: true,
    },
    imageCover: {
      type: String,
      // required: [true, "A pet must have a cover images"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    color: {
      type: String,
      lowercase: true,
    },
    bio: {
      type: String,
    },
    hypoallergenic: Boolean,
    dietaryRestrictions: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
