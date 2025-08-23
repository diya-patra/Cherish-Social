import { User } from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/Trycatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import bcrypt, { hash } from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = TryCatch(async (req, res) => {
    const { name, email, password, gender } = req.body

    const file = req.file;

    if (!name || !email || !password || !gender || !file) {
        return res.status(400).json({
            message: "Please give  all values",
        });
    }

    let user = await User.findOne({ email });

    if (user)
        return res.status(400).json({
            message: "User Already Exists"
        });

    const fileUrl = getDataUrl(file);

    const hashPassword = await bcrypt.hash(password, 10);

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    user = await User.create({
        name,
        email,
        password: hashPassword,
        gender,
        profilePic: {
            id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });

    generateToken(user._id, res);

    res.status(201).json({
        message: "User Registered",
        user,
    });
});

export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    // if (!email || !password) {
    //     return res.status(400).json({
    //         message: "Please provide all values",
    //     });
    // }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "No user with this email",
        });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        return res.status(400).json({
            message: "Invalid Credentials",
        });
    }

    generateToken(user._id, res);

    res.status(200).json({
        message: "User Logged In",
        user,
    });
})

export const logoutUser = TryCatch(async (req, res) => {
    res.cookie("token", "", {
        maxAge: 0,
        // expires: new Date(Date.now()),
        // httpOnly: true,
    });

    res.status(200).json({
        message: "Logged out succesfully",
    });
});