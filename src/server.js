import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import { setIO } from "./config/socket.js";
import ApiRoutes from "./routes/index.js";
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/pulsiq-app/api", ApiRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setIO(io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`✅ Pulsiq backend server is connected at port ${port}`);
});
