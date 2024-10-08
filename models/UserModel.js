import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
});

// userSchema.pre("save", async (next) => {
//   this.password = bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(this.password, salt, function (err, hash) {
//       return hash;
//     });
//   });
//   next();
// });

const Users = mongoose.model("Users", userSchema);
export default Users;
