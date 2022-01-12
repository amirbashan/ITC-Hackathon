import express from "express";
import { protect, restrictTo } from "./../controllers/authController.js";
import {
  getAllPets,
  getPet,
  updatePet,
  deletePet,
  createPet,
  getUserPets,
  setFilterForUser,
  imageUploader,
} from "../controllers/petController.js";
import app from "../app.js";
import multer from "multer";
import { upload } from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAllPets)
  .post(
    protect,
    restrictTo("admin"),
    upload.single("imageCover"),
    imageUploader,
    createPet
  );

router
  .route("/:id")
  .get(getPet)
  //patch protect and restrict
  .patch(
    protect,
    restrictTo("admin"),
    upload.single("imageCover"),
    imageUploader,
    updatePet
  )
  .delete(protect, restrictTo("admin"), deletePet);

router.route("/user/:userId").get(setFilterForUser, getUserPets);

export default router;
