import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // Your register function is fine, no changes needed here.
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password != confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const maleProfilePhoto = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${username}&sex=male`;
        const femaleProfilePhoto = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${username}&sex=female`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordmatch = await bcrypt.compare(password, user.password);
        if (!isPasswordmatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

        // ✅ Define the correct cookie options for deployment
        const cookieOptions = {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,    // Required for cross-site cookies over HTTPS
            sameSite: 'None' // Required for cross-site cookies
        };

        return res.status(200).cookie("token", token, cookieOptions).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
             message: "Logged in successfully!"
        });
    } catch (error) {
        console.log(error);
    }
}
export const logout = (req, res) => {
    try {
        // ✅ Add sameSite and secure options to logout to ensure cookie is cleared
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'None', secure: true }).json({
            message: "Logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}


