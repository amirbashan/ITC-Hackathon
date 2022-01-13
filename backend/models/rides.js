import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  pickUp: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    //[longitude, latitude] NOTE the order
    coordinates: {
      type: [Number],
      required: [true, "pickUp must have coordinates"],
    },
    address: String,
  },
  dropOff: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    //[longitude, latitude] NOTE the order
    coordinates: {
      type: [Number],
      required: [true, "dropOff must have coordinates"],
    },
    address: String,
  },
  rideTime: {
    type: Date,
    default: Date.now(),
    required: [true, "The time of day must be specified"],
  },
  status: {
    type: Number,
    required: [true, "A ride must have a status."],
    default: 0,
    enum: {
      values: [0, 1, 2, 3, 4],
      message:
        "Please select a valid number from 0-4 according to the stages definition. (see docs)",
    },
  },
  requestRef: [{ type: mongoose.Schema.ObjectId, ref: "requests" }],
  chosenRide: { type: mongoose.Schema.ObjectId, ref: "requests" },
});

rideSchema.index({ pickUp: "2dsphere" });
rideSchema.index({ dropOff: "2dsphere" });

const ride = mongoose.model("Ride", rideSchema);

export default ride;
