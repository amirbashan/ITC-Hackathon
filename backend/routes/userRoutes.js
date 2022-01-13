import express from "express";
import {
  protect,
  login,
  signup,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
  logout,
  isValidToken,
} from "./../controllers/authController.js";
import {
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  savePet,
  deleteSavedPet,
  getUserSavedPets,
  imageUploader,
} from "./../controllers/userController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.get("/validToken", isValidToken);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect);

router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", upload.single("photo"), imageUploader, updateMe);
router.delete("/deleteMe", deleteMe);

// router
//   .route("/pets/:petId/save")
//   .post(restrictTo("user"), savePet, updateUser)
//   .delete(restrictTo("user"), deleteSavedPet, updateUser);
// router.route("/:id/savedPets").get(protect, getUserSavedPets);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
