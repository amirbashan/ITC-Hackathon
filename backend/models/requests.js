import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  joinerId: { type: mongoose.Schema.ObjectId, ref: "User" },

  date: { type: Date, default: Date.now },

  pickUp: {
    type: Object,
    required: [true, "where do you want to start your ride?"],
  },

  dropOff: {
    type: Object,
    required: [true, "where do you want to end your ride?"],
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
      values: [0, 1, 2, 3, 4],
      message:
        "Please select a valid number from 1-4 according to the stages definition. (see docs)",
    },
    msg: { type: String },
  },
});

const request = mongoose.model("request", requestSchema);

export default request;
