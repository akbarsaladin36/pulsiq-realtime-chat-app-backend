import express from "express";
import userRoutes from "./user.js";

const Route = express.Router();
Route.use("/users", userRoutes);

export default Route;
