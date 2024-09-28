import mongoose from "mongoose";
const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
  ],
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Messages",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

ChannelSchema.pre("save", (next) => {
  this.updatedAt = Date.now();
  next();
});

ChannelSchema.pre("findOneAndUpdate", (next) => {
  this.updatedAt = Date.now();
  next();
});

const Channels = mongoose.model("Channels", ChannelSchema);
export default Channels;
