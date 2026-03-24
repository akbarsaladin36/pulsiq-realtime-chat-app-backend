import express from "express"
import authMiddleware from "../../middlewares/auth.js"
import contactController from "../../controllers/contact.controller.js"

const router = express.Router()
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole("user"), contactController.GetContactsController)
router.get("/:contactUuid", authMiddleware.userAuthentication, authMiddleware.checkRole("user"), contactController.GetContactController)
router.post("/", authMiddleware.userAuthentication, authMiddleware.checkRole("user"), contactController.CreateContactController)
router.delete("/:contactUuid", authMiddleware.userAuthentication, authMiddleware.checkRole("user"), contactController.DeleteContactController)

export default router