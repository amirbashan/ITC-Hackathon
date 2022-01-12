import express from "express";
import {
  createRide,
  getAllRides,
  getRide,
  getRidesWithin,
  updateRide,
} from "../controllers/rideController.js";
import { protect, restrictTo } from "./../controllers/authController.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllRides).post(createRide).patch(updateRide);
router.route("/:id").get(getRide);

//latlng is like this center/34.094,24.57/unit...
router
  .route("/rides-within/:distance/center/:latlng/unit/:unit")
  .get(getRidesWithin);
export default router;
