import express from "express";
import messageRoutes from "./message.js";
import profileRoutes from "./profile.js";
import contactRoutes from "./contact.js";

const Route = express.Router();
Route.use("/messages", messageRoutes);
Route.use("/profile", profileRoutes);
Route.use("/contacts", contactRoutes);

export default Route;
