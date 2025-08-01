import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import transporter from "../config/nomemailer.js";

class AuthController {
  generateToken(userId) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "7d",
    });
  }

  register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      if (!newUser || !newUser._id) {
        throw new Error("Failed to create user");
      }

      const token = this.generateToken(newUser._id.toString());

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      };

      res.cookie("token", token, cookieOptions);

      const userData = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userData,
        token
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error on registration",
        error: error.message,
      });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }

      const token = this.generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userData,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error on login",
        error: error.message,
      });
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error on logout",
        error: error.message,
      });
    }
  };

  sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    try {
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetPasswordOtp = otp;
      user.resetPasswordOtpExpireAt = Date.now() + 15 * 60 * 1000;

      await user.save();

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Password Reset Code",
        html: `
        <p>Your password reset code is: <strong>${otp}</strong></p>
        <p>This code will expire in 15 minutes.</p>
      `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "Password reset OTP sent to email: " + email,
      });
    } catch (error) {
      console.error("Error in sendPasswordResetEmail:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };

  verifyResetPasswordOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    try {
      const user = await userModel.findOne({
        email,
        resetPasswordOtp: otp,
        resetPasswordOtpExpireAt: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP or expired",
        });
      }

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error during OTP verification",
        error: error.message,
      });
    }
  };

  resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (
        user.resetPasswordOtp !== otp ||
        user.resetPasswordOtpExpireAt < Date.now()
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired OTP",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordOtp = "";
      user.resetPasswordOtpExpireAt = 0;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
}

export default new AuthController();
