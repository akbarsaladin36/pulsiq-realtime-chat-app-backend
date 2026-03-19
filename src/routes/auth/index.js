import express from "express";
import authController from "../../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", authController.RegisterController);
router.post("/login", authController.LoginController);

export default router;
