// import { Server } from "socket.io";
import express from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/AuthRoutes.js";
import contactsRouter from "./routes/ContactsRoutes.js";
import MessagesRouter from "./routes/MessagesRoutes.js";
import channelRouter from "./routes/ChannelRoutes.js";
// import setupSocket from "./socket.js";
const server = express();

server.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(
  cors({
    origin: "https://chatapp-frontend-olive.vercel.app", // استبدل بالنطاق الصحيح
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // يسمح بإرسال الاعتمادات
  })
);

server.listen(5000, () => {
  console.log("Server Connect successful✅");
});

// setupSocket(serverSocket);
mongoose
  .connect(
    "mongodb+srv://maro:p35VFhnTqPoi4jSP@cluster0.stni8hg.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB Connect Successful✅");
  });

env.config();
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.json());
server.get("/hi", (req, res) => {
  return res.json({ message: "hi" });
});
server.use("/uploads/images", express.static("uploads/images"));
server.use("/uploads/files", express.static("uploads/files"));
server.use("/api/auth", authRouter);
server.use("/api/contacts", contactsRouter);
server.use("/api/messages", MessagesRouter);
server.use("/api/channel", channelRouter);
