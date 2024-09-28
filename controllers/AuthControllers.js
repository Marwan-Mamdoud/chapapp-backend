import { sign } from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
// import { env } from "dotenv";
import bcrypt from "bcryptjs";
// import fs from "fs";
const maxAge = 1 * 24 * 60 * 60 * 1000;

const createToken = async (userId, email) => {
  return sign({ email, userId }, process.env.JWT_SECRET, {});
};

export const signUp = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 12);
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }
    let user = await new UserModel({ email, password });
    user = await user.save();
    const jwt = await createToken(user._id, user.email);
    res.cookie("jwt", jwt, {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        jwt,
      },
    });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "Server Controller Error", err: error.message });
  }
};

export const loggIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password is required" });
    }
    const user = await UserModel({ email: email });
    if (!user) {
      return res.status(400).json({ message: "there is no email like this" });
    }
    const rightPass = bcrypt.compare(password, user.password);
    if (!rightPass) {
      return res.status(400).json({ message: "wrong password" });
    }
    const jwt = await createToken(user._id, user.email);
    res.cookie("jwt", jwt, {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({ user, jwt });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ messsage: "Server Controller Error" });
  }
};

export const loggout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
    return res.status(200).json({ Message: "Done Loggout Successfully.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Message: "Server Controller Error" });
  }
};

export const getUserInfo = async (req, res, next) => {
  const userId = req.userId;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "no user founded" });
  }
  return res.status(200).json({
    id: user._id,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    color: user.color,
    profileSetup: user.profileSetup,
  });
};

export const updateProfile = async (req, res, next) => {
  const userId = req.userId;
  const { firstName, lastName, color } = req.body;
  const data = req.body;
  const user = await UserModel.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      color,
      profileSetup: true,
    },
    { new: true, runValidators: true }
  );
  console.log(user, "user Data");
  return res.status(201).json({
    id: user._id,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    color: user.color,
    profileSetup: user.profileSetup,
  });
};

export const updateImage = async (req, res, next) => {
  // const userId = req.userId;
  // const { file } = req;
  // if (!file) {
  //   return res.status(400).json({ message: "File is required" });
  // }
  try {
    //   let fileName = `uploads/images` + "/" + file.originalname;
    //   fs.renameSync(file.path, fileName);
    //   const userUpdata = await UserModel.findByIdAndUpdate(
    //     userId,
    //     {
    //       image: fileName,
    //     },
    //     { new: true, runValidators: true }
    //   );
    return res.status(201).json({
      Message: "Done Updata imageProfile",
      image: "hph",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Controller Error" });
  }
};

export const deleteImage = async (req, res, next) => {
  const userId = req.userId;
  const user = await UserModel.findById(userId);
  // if (user.image) {
  //   fs.unlinkSync(user.image);
  // }
  // user.image = null;
  // user.save();
  return res.status(201).json({ message: "Done delete image profile" });
};
