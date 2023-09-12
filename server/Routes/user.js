import express from "express";
import { RegisterUser,LoginUser } from "../Controllers/user.js";
import { userVerification } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.post('/',userVerification)

export default router;