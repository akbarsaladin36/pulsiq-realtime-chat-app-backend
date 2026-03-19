import express from "express";
import userController from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();
router.get(
  "/",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("admin"),
  userController.GetUsersController,
);
router.get(
  "/:username",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("admin"),
  userController.GetUserController,
);
router.post(
  "/",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("admin"),
  userController.CreateUserController,
);
router.patch(
  "/:username",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("admin"),
  userController.UpdateUserController,
);
router.delete(
  "/:username",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("admin"),
  userController.DeleteUserController,
);

export default router;
