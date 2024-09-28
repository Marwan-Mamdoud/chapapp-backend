import { Router } from "express";
import { isAuth } from "../middlewares/AuthMiddleware.js";
// import multer from "multer";
import {
  deleteImage,
  getUserInfo,
  loggIn,
  loggout,
  signUp,
  updateImage,
  updateProfile,
} from "../controllers/AuthControllers.js";
// const uploads = multer({ dest: "uploads/images" });
const router = Router();
router.post("/signup", signUp);

router.post("/loggin", loggIn);

router.post("/loggout", isAuth, loggout);

router.post("/user-update", isAuth, updateProfile);

// router.post(
//   "/image-update",
//   isAuth,
//   // uploads.single("profile-image"),
//   updateImage
// );

router.delete("/image-delete", isAuth, deleteImage);

router.get("/user-info", isAuth, getUserInfo);

export default router;
