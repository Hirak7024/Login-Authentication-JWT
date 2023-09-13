import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoute from "./Routes/user.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import passwordRoute from "./Routes/password.js"

dotenv.config();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(
    cors({
        origin: ["https://login-authentication-jwt.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("This is the running server port for Complete Authentication")
})

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () => console.log("MongoDB Disconnected"))


app.use("/user", UserRoute);
app.use("/password", passwordRoute);


app.listen(PORT, () => { console.log(`Server Running at PORT ${PORT}`) });
