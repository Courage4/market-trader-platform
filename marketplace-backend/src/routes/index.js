const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const vendorRoutes = require('./vendor.routes');
const buyerRoutes = require('./buyer.routes');
const roleSwitchRoutes = require('./role-switch.routes');
const orderRoutes = require('./order.routes');
const cartRoutes = require('./cart.routes');

// Define routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/vendor', vendorRoutes);
router.use('/buyer', buyerRoutes);
router.use('/role-switch', roleSwitchRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
