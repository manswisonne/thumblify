
import type { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/jwt.js';

// Controller for user registration
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Find user by email in db
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        
        await newUser.save();
        
        // Setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id.toString();
        
        // Generate JWT token
        const token = generateToken(newUser._id.toString());
        
        return res.status(201).json({
            message: "User registered successfully",
            token, // Send token to frontend
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
    } catch (error: any) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller for user login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        // Find user by email in db
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        // Setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();
        
        // Generate JWT token
        const token = generateToken(user._id.toString());
        
        console.log('✅ Login successful, token generated');
        
        return res.status(200).json({
            message: "Login successful",
            success: true,
            token, // Send token to frontend
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error: any) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller for user logout
export const logoutUser = (req: Request, res: Response) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.error("Error destroying session:", error);
                return res.status(500).json({ message: "Server error" });
            }
            // Clear the session cookie
            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                sameSite: 'lax'
            });
            return res.status(200).json({ message: "Logout successful" });
        });
    } catch (error: any) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller for getting user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // Check if user is logged in
        if (!req.session.isLoggedIn || !req.session.userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const userId = req.session.userId;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error: any) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller for verifying user
export const verifyUser = async (req: Request, res: Response) => {
    try {
        if (!req.session.isLoggedIn || !req.session.userId) {
            return res.status(401).json({ 
                message: "Not authenticated",
                isAuthenticated: false 
            });
        }
        
        const user = await User.findById(req.session.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                message: "User not found",
                isAuthenticated: false 
            });
        }
        
        return res.status(200).json({ 
            isAuthenticated: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error: any) {
        console.error("Error verifying user:", error);
        res.status(500).json({ message: "Server error" });
    }
<<<<<<< HEAD
};
=======
};
>>>>>>> bb2cdc8ab04e1a64148d2a721c42ec328f28945c
