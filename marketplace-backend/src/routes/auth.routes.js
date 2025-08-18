const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', async (req, res) => {
    try {
        const result = await authController.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authController.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const result = await authController.forgotPassword(req.body.email);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    try {
        const result = await authController.resetPassword(
            req.params.token,
            req.body.password
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/verify-email/:token', async (req, res) => {
    try {
        const result = await authController.verifyEmail(req.params.token);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Protected routes
router.use(protect);

router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.put('/update-profile', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            },
            { new: true, runValidators: true }
        );
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.put('/update-password', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        const isMatch = await user.comparePassword(req.body.currentPassword);
        
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }

        user.password = req.body.newPassword;
        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
