const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const vendorRoutes = require('./vendor.routes');
const orderRoutes = require('./order.routes');
const cartRoutes = require('./cart.routes');

// Define routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/vendors', vendorRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
