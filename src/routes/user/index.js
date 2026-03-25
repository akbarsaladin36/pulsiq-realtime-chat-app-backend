import express from "express";
import userRoutes from "./user.js";
import messageRoutes from "./message.js";
import profileRoutes from "./profile.js";
import contactRoutes from "./contact.js";

const Route = express.Router();
Route.use("/users", userRoutes);
Route.use("/messages", messageRoutes);
Route.use("/profile", profileRoutes);
Route.use("/contacts", contactRoutes);

export default Route;
