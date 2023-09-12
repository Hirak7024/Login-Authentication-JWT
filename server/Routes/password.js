import express from "express";
import { ForgotPassword,ResetPassword } from "../Controllers/password.js";

const router = express.Router();

router.post("/forgot", ForgotPassword);
router.post("/reset/:id/:token", ResetPassword);

export default router;