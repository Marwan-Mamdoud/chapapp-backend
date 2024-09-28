import { Router } from "express";
import { isAuth } from "../middlewares/AuthMiddleware.js";
import {
  createChannel,
  getChannelMessages,
  getUserChannels,
} from "../controllers/ChannelController.js";

const router = Router();

router.post("/create-channel", isAuth, createChannel);

router.get(
  "/get-user-channels",
  isAuth,
  getUserChannels
  // ChannelConroller.getUserChannels
);

router.get(
  "/get-channel-messages/:channelId",
  isAuth,
  getChannelMessages
  // ChannelConroller.getChannelMessages
);

export default router;
