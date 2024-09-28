import { Router } from "express";
import { isAuth } from "../middlewares/AuthMiddleware.js";
import { getAllContacts } from "../controllers/ContactsController.js";
import {
  getAllMessages,
  uploadsFile,
} from "../controllers/MessageController.js";
import multer from "multer";
const upload = multer({ dest: "uploads/files" });
const MessagesRouter = Router();

MessagesRouter.post(
  "/get-all-messages",
  isAuth,
  getAllMessages
  // MessageController.getAllMessages
);

MessagesRouter.post(
  "/upload-files",
  isAuth,
  upload.single("file"),
  uploadsFile
  // MessageController.uploadsFile
);

export default MessagesRouter;
