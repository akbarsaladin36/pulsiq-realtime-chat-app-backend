import express from "express";
import authController from "../../controllers/auth.controller.js";
import authMiddleware from "../../middlewares/auth.js";
const router = express.Router();

router.post("/register", authController.RegisterController);
router.post("/login", authController.LoginController);
router.get(
  "/me",
  authMiddleware.userAuthentication,
  authController.CurrentUserController,
);

export default router;
