const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/search', async (req, res) => {
    try {
        const result = await productController.searchProducts(req.query);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/featured', async (req, res) => {
    try {
        const result = await productController.getFeaturedProducts(req.query.limit);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await productController.getAll(req.query);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await productController.getById(req.params.id, {
            populate: 'category vendor reviews.user'
        });
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Protected routes
router.use(protect); // Middleware to protect routes below

router.post('/', authorize('vendor', 'admin'), async (req, res) => {
    try {
        const result = await productController.create({
            ...req.body,
            vendor: req.user._id
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.put('/:id', authorize('vendor', 'admin'), async (req, res) => {
    try {
        const result = await productController.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.delete('/:id', authorize('vendor', 'admin'), async (req, res) => {
    try {
        const result = await productController.delete(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.post('/:id/reviews', async (req, res) => {
    try {
        const result = await productController.addReview(req.params.id, {
            ...req.body,
            user: req.user._id,
            name: req.user.name
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.get('/vendor/:vendorId', async (req, res) => {
    try {
        const result = await productController.getVendorProducts(
            req.params.vendorId,
            req.query
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
