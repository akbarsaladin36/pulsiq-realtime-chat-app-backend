import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import profileController from "../../controllers/profile.controller.js";

const router = express.Router();
router.get(
  "/",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("user"),
  profileController.GetProfileController,
);
router.patch(
  "/",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("user"),
  profileController.UpdateProfileController,
);

export default router;
