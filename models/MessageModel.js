import mongoose from "mongoose";
const MessageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: () => {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: () => {
      return this.messageType === "file";
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model("Messages", MessageSchema);
export default Messages;
