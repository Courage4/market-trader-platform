const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class AuthController {
    // Register user
    async register(userData) {
        try {
            const { email, password, role } = userData;

            // Check if user exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Create verification token
            const verificationToken = crypto.randomBytes(32).toString('hex');
            const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

            // Create user
            const user = await User.create({
                ...userData,
                verificationToken,
                verificationTokenExpires
            });

            // Generate JWT token
            const token = this.generateToken(user._id);

            // TODO: Send verification email

            return {
                success: true,
                data: { user, token }
            };
        } catch (error) {
            throw error;
        }
    }

    // Login user
    async login(email, password) {
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            // Update last login
            user.lastLogin = Date.now();
            await user.save();

            const token = this.generateToken(user._id);

            return {
                success: true,
                data: { user, token }
            };
        } catch (error) {
            throw error;
        }
    }

    // Forgot password
    async forgotPassword(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Generate reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            user.resetPasswordToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

            await user.save();

            // TODO: Send reset password email

            return {
                success: true,
                message: 'Password reset email sent'
            };
        } catch (error) {
            throw error;
        }
    }

    // Reset password
    async resetPassword(token, newPassword) {
        try {
            const resetPasswordToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');

            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                throw new Error('Invalid or expired token');
            }

            user.password = newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return {
                success: true,
                message: 'Password reset successful'
            };
        } catch (error) {
            throw error;
        }
    }

    // Verify email
    async verifyEmail(token) {
        try {
            const user = await User.findOne({
                verificationToken: token,
                verificationTokenExpires: { $gt: Date.now() }
            });

            if (!user) {
                throw new Error('Invalid or expired token');
            }

            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpires = undefined;
            await user.save();

            return {
                success: true,
                message: 'Email verified successfully'
            };
        } catch (error) {
            throw error;
        }
    }

    // Generate JWT Token
    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
    }
}

module.exports = new AuthController();
