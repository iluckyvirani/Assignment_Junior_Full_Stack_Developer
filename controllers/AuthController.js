import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "failed", message: "Email already exists" });
        }

        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ status: "failed", message: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ status: "success", message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ status: "failed", message: "Unable to register user", error });
    }
};




export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: "failed", message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            status: "success",
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ status: "failed", message: "Unable to login user" });
    }
};


export const GetProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve profile', error });
    }
}