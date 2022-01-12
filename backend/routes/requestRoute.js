import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  getAllRequests,
  createRequest,
  matchRideId,
  updateRequests,
  matchRequest,
  cancelMatch,
  cancelRequest,
  requestDefaults,
  filterMyRequests,
} from "../controllers/requestsController.js";

const router = express.Router();

router.use(protect);

router
  .route("/rides/:rideId")
  .get(matchRideId, getAllRequests)
  .post(requestDefaults, createRequest);

// front will send the request Status
router.route("/myRequests").get(filterMyRequests, getAllRequests);

router
  .route("/myRequests/:id")
  .patch(updateRequests)
  .delete(cancelRequest, updateRequests);

router
  .route("/:id/matchRequest")
  .patch(matchRequest, updateRequests)
  .delete(cancelMatch, updateRequests);

export default router;
