const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

// All routes are protected
router.use(protect);

// Validation rules
const addItemValidation = [
    body('productId')
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID'),
    body('quantity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1')
];

// Get cart
router.get('/', async (req, res) => {
    try {
        const result = await cartController.getCart(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Add item to cart
router.post('/items', validate(addItemValidation), async (req, res) => {
    try {
        const result = await cartController.addItem(req.user.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Update item quantity
router.put('/items/:productId', validate(addItemValidation), async (req, res) => {
    try {
        const result = await cartController.updateItemQuantity(
            req.user.id,
            {
                productId: req.params.productId,
                quantity: req.body.quantity
            }
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Remove item from cart
router.delete('/items/:productId', async (req, res) => {
    try {
        const result = await cartController.removeItem(
            req.user.id,
            req.params.productId
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Clear cart
router.delete('/', async (req, res) => {
    try {
        const result = await cartController.clearCart(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Apply coupon
router.post('/apply-coupon', 
    validate([
        body('couponCode')
            .trim()
            .notEmpty()
            .withMessage('Coupon code is required')
    ]),
    async (req, res) => {
        try {
            const result = await cartController.applyCoupon(
                req.user.id,
                req.body.couponCode
            );
            res.json(result);
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
);

// Remove coupon
router.delete('/remove-coupon/:code', async (req, res) => {
    try {
        const result = await cartController.removeCoupon(
            req.user.id,
            req.params.code
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
