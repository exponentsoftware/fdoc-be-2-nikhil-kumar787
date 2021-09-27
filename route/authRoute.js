import express from "express";
import {
  authAdmin,
  authUser,
  registerAdmin,
  registerUser,
} from "../controller/authController.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/admin/register").post(registerAdmin);
router.post("/login", authUser);
router.post("/admin/login", authAdmin);
export default router;
