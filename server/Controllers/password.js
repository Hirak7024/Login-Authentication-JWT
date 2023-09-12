import express from "express";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";

dotenv.config();
const router = express.Router();

export const ForgotPassword = (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User does not exist" })
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hirakjyotidas2808000@gmail.com',
                    pass: 'payxrurdiewqydam'
                }
            });

            var mailOptions = {
                from: 'hirakjyotidas2808000@gmail.com',
                to: `${user.email}`,
                subject: 'Reset Your Password',
                text: `https://hotel-booking-personal-project-cswd.vercel.app//reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success" })
                }
            });
        })
}

export const ResetPassword = (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" })
        } else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then(u => res.send({ Status: "Success" }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))
        }
    })
}

export default router;