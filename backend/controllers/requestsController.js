import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";

import Requests from "../models/requests.js";

export const getAllRequests = getAll(Requests);
export const getRequests = getOne(Requests);
export const updateRequests = updateOne(Requests);
export const deleteRequests = deleteOne(Requests);

export const createRequest = createOne(Requests);
export const matchRideId = (req, res, next) => {
  req.query = { rideId: req.params.rideId };
  next();
};

export const requestType = (req, res, next) => {
  req.query = { joinerId: req.user._id };
  next();
};

export const deactivateRequest = (req, res, next) => {
  req.body.status = 4;
  next();
};

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) {
//       newObj[el] = obj[el];
//     }
//   });
//   return newObj;
// };
