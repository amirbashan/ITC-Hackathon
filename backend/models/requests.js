import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  joinerId: { type: mongoose.Schema.ObjectId, ref: "User" },
  rideId: { type: mongoose.Schema.ObjectId, ref: "Ride" },
  date: { type: Date, default: Date.now },
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
    type: String,
    required: [true, "what time you want to start your ride?"],
  },

  status: {
    type: Number,
    required: [true, "Was the request completed"],
    default: 0,
    enum: {
      values: [0, 1, 2, 3, 4, 5],
      message:
        "Please select a valid number from 1-4 according to the stages definition. (see docs)",
    },
    msg: { type: String },
  },
});

const request = mongoose.model("request", requestSchema);

export default request;
