import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import messageController from "../../controllers/message.controller.js";

const router = express.Router();
router.get(
  "/",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("user"),
  messageController.GetMessagesController,
);
router.get(
  "/:otherUserUuid",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("user"),
  messageController.GetMessageController,
);
router.post(
  "/",
  authMiddleware.userAuthentication,
  authMiddleware.checkRole("user"),
  messageController.CreateMessageController,
);

export default router;
