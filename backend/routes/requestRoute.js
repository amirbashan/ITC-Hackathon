import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { getAllRequests, createRequest, matchRideId, updateRequests, deactivateRequest, requestType } from "../controllers/requestsController.js";

const router = express.Router();

router.route("/:rideId").get(matchRideId, getAllRequests).post(protect, matchRideId, createRequest);

router.route("/deactivate/:id").patch(protect, deactivateRequest, updateRequests);

// front will send the request Status
router.route("/myRequests").get(protect, requestType, getAllRequests);

router.route("/myRequests/:id").patch(protect, updateRequests);

export default router;
