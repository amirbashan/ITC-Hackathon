import express from "express";
import {
  adoptPet,
  createAdoptionEvent,
  returnPet,
  getAllAdoptions,
  updateAdoptionEvent,
  approveStage,
  rejectStage,
  filterAdoptions,
  adoptFromFoster,
  getAdoption,
  filterAdoption,
  filterPendingRequestAdoptions,
  adoptionStats,
} from "../controllers/adoptionController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(protect);

router
  .route("/pets/:petId/adopt")
  .post(adoptPet, createAdoptionEvent)
  .patch(adoptFromFoster, updateAdoptionEvent)
  .delete(returnPet, updateAdoptionEvent);

router.route("/:adoptionId/reject").patch(rejectStage, updateAdoptionEvent);

router.use(restrictTo("admin"));
router.route("/").get(filterAdoptions, getAllAdoptions);
router
  .route("/pendingAdmin")
  .get(filterPendingRequestAdoptions, getAllAdoptions);
router.route("/stats").get(adoptionStats);
router.route("/:adoptionId").get(filterAdoption, getAdoption);
router.route("/:adoptionId/approve").patch(approveStage, updateAdoptionEvent);

export default router;
