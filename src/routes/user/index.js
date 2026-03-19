import express from "express";
import messageRoutes from "./message.js";
import profileRoutes from "./profile.js";

const Route = express.Router();
Route.use("/messages", messageRoutes);
Route.use("/profile", profileRoutes);

export default Route;
