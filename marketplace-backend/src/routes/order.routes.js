const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Customer routes
router.post('/', async (req, res) => {
    try {
        const result = await orderController.createFromCart(req.user.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/my-orders', async (req, res) => {
    try {
        const result = await orderController.getUserOrders(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Vendor routes
router.get('/vendor-orders', authorize('vendor'), async (req, res) => {
    try {
        const result = await orderController.getVendorOrders(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/vendor-stats', authorize('vendor'), async (req, res) => {
    try {
        const result = await orderController.getOrderStats(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Admin routes
router.get('/', authorize('admin'), async (req, res) => {
    try {
        const result = await orderController.getAll(req.query, {
            populate: 'user orderItems.product orderItems.vendor'
        });
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/stats', authorize('admin'), async (req, res) => {
    try {
        const result = await orderController.getOrderStats();
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Common routes
router.get('/:id', async (req, res) => {
    try {
        const result = await orderController.getById(req.params.id, {
            populate: 'user orderItems.product orderItems.vendor'
        });
        
        // Check if user has permission to view this order
        const order = result.data;
        const isAdmin = req.user.role === 'admin';
        const isVendor = req.user.role === 'vendor' && 
            order.orderItems.some(item => item.vendor.toString() === req.user.id);
        const isOwner = order.user.toString() === req.user.id;

        if (!isAdmin && !isVendor && !isOwner) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to access this order'
            });
        }

        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.put('/:id/status', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new Error('Order not found');
        }

        // Check permissions
        const isAdmin = req.user.role === 'admin';
        const isVendor = req.user.role === 'vendor' && 
            order.orderItems.some(item => item.vendor.toString() === req.user.id);

        if (!isAdmin && !isVendor) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to update this order'
            });
        }

        const result = await orderController.updateStatus(
            req.params.id,
            req.body.status
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
