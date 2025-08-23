import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './database/db.js';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import { Chat } from './models/chatModels.js';
import { isAuth } from './middlewares/isAuth.js';
import { User } from './models/userModel.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.Coludinary_Cloud_Name,
    api_key: process.env.Cloudinary_Api,
    api_secret: process.env.Coludinary_Secret
})

const app = express();

// using middleware

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Server Working');
});

// to get all chats of a user

app.get("/chats", isAuth, async (req, res) => {
    try {
        const chats = await Chat.find({
            users: req.user._id,
        }).populate({
            path: "users",
            select: "name profilePic",
        });

        chats.forEach((e) => {
            e.users = e.users.filter(
                user => user._id.toString() !== req.user._id.toString()
            );
        })

        res.status(200).json({
            chats,
            });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
})

// to get all users

app.get("/api/user/all", isAuth, async (req, res) => {
    try {
        const search = req.query.search || "";
        const users = await User.find({
            name: { 
                $regex: search,
                $options: "i",
            },
            _id: { $ne: req.user._id },
        }).select("-password");

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// importing routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// using routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    ConnectDB();
});