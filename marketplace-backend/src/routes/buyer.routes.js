const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyer.controller');
const { protect, requireRole, allowRoleSwitch } = require('../middleware/auth');

/**
 * @swagger
 * /buyer/dashboard:
 *   get:
 *     summary: Get buyer dashboard analytics
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         orders:
 *                           $ref: '#/components/schemas/BuyerOrderStats'
 *                         favorites:
 *                           $ref: '#/components/schemas/FavoriteStats'
 *                         cart:
 *                           $ref: '#/components/schemas/CartStats'
 *                     recentActivity:
 *                       type: object
 *                       properties:
 *                         orders:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Order'
 *                         favorites:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Product'
 *                     spending:
 *                       $ref: '#/components/schemas/SpendingAnalytics'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/dashboard', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const result = await buyerController.getDashboardAnalytics(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /buyer/orders:
 *   get:
 *     summary: Get buyer orders
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *         description: Filter by order status
 *     responses:
 *       200:
 *         description: Buyer orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/orders', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const result = await buyerController.getBuyerOrders(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /buyer/favorites:
 *   get:
 *     summary: Get buyer favorites
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [product, vendor]
 *         description: Filter by favorite type
 *     responses:
 *       200:
 *         description: Buyer favorites retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     favorites:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/favorites', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const result = await buyerController.getBuyerFavorites(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /buyer/favorites/{productId}:
 *   post:
 *     summary: Add product to favorites
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *     responses:
 *       200:
 *         description: Product added to favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product added to favorites"
 *                 data:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/favorites/:productId', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await buyerController.addToFavorites(req.user.id, productId);
        res.json(result);
    } catch (error) {
        if (error.message === 'Product not found') {
            res.status(404).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

/**
 * @swagger
 * /buyer/favorites/{productId}:
 *   delete:
 *     summary: Remove product from favorites
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *     responses:
 *       200:
 *         description: Product removed from favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product removed from favorites"
 *                 data:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete('/favorites/:productId', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await buyerController.removeFromFavorites(req.user.id, productId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /buyer/cart:
 *   get:
 *     summary: Get buyer cart
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/cart', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const result = await buyerController.getBuyerCart(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /buyer/cart/{productId}:
 *   post:
 *     summary: Add product to cart
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 default: 1
 *                 minimum: 1
 *                 description: Quantity to add
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product added to cart"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/cart/:productId', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity = 1 } = req.body;
        const result = await buyerController.addToCart(req.user.id, productId, quantity);
        res.json(result);
    } catch (error) {
        if (error.message === 'Product not found') {
            res.status(404).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

/**
 * @swagger
 * /buyer/cart/{productId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 0
 *                 description: New quantity (0 to remove item)
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cart updated"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found in cart
 *       500:
 *         description: Internal server error
 */
router.put('/cart/:productId', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const result = await buyerController.updateCartItem(req.user.id, productId, quantity);
        res.json(result);
    } catch (error) {
        if (error.message === 'Item not found in cart') {
            res.status(404).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

/**
 * @swagger
 * /buyer/cart/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product removed from cart"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found in cart
 *       500:
 *         description: Internal server error
 */
router.delete('/cart/:productId', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await buyerController.removeFromCart(req.user.id, productId);
        res.json(result);
    } catch (error) {
        if (error.message === 'Item not found in cart') {
            res.status(404).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

/**
 * @swagger
 * /buyer/cart/clear:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cart cleared"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete('/cart/clear', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const result = await buyerController.clearCart(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /buyer/profile:
 *   put:
 *     summary: Update buyer profile
 *     tags: [Buyer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address
 *                 example: "john@example.com"
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number
 *                 example: "+1234567890"
 *               address:
 *                 type: object
 *                 description: Address information
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "New York"
 *                   state:
 *                     type: string
 *                     example: "NY"
 *                   zipCode:
 *                     type: string
 *                     example: "10001"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth
 *                 example: "1990-01-01"
 *               preferences:
 *                 type: object
 *                 description: User preferences
 *                 properties:
 *                   notifications:
 *                     type: boolean
 *                     example: true
 *                   newsletter:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put('/profile', protect, allowRoleSwitch('buyer'), async (req, res) => {
    try {
        const result = await buyerController.updateBuyerProfile(req.user.id, req.body);
        res.json(result);
    } catch (error) {
        if (error.message === 'Buyer not found') {
            res.status(404).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

module.exports = router;