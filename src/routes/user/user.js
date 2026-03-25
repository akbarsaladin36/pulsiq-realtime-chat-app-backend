import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import userController from "../../controllers/user.controller.js";

const router = express.Router();
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole("user"), userController.GetUsersPaginateController);

export default router;