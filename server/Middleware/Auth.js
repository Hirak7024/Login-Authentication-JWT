import UserModel from "../Models/User.js"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await UserModel.findById(data.id)
            if (user) return res.json({ status: true, user: user.name })
            else return res.json({ status: false })
        }
    })
}