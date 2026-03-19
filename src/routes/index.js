import express from "express";
import authRoutes from "./auth/index.js";
import adminRoutes from "./admin/index.js";
import userRoutes from "./user/index.js";
const Route = express.Router();

Route.use("/auth", authRoutes);
Route.use("/admin", adminRoutes);
Route.use("/user", userRoutes);

export default Route;
