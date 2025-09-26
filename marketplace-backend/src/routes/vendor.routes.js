const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');
const { protect, requireRole } = require('../middleware/auth');

/**
 * @swagger
 * /vendor/dashboard:
 *   get:
 *     summary: Get vendor dashboard analytics
 *     tags: [Vendor]
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
 *                         products:
 *                           $ref: '#/components/schemas/ProductStats'
 *                         orders:
 *                           $ref: '#/components/schemas/OrderStats'
 *                         revenue:
 *                           $ref: '#/components/schemas/RevenueStats'
 *                     recentActivity:
 *                       type: object
 *                       properties:
 *                         products:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Product'
 *                         orders:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Order'
 *                     performance:
 *                       $ref: '#/components/schemas/PerformanceMetrics'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/dashboard', protect, requireRole('vendor'), async (req, res) => {
    try {
        const result = await vendorController.getDashboardAnalytics(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /vendor/analytics:
 *   get:
 *     summary: Get detailed vendor analytics
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for analytics (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for analytics (YYYY-MM-DD)
 *         example: "2024-12-31"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *         description: Filter by order status
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [hour, day, week, month]
 *           default: day
 *         description: Group analytics data by time period
 *     responses:
 *       200:
 *         description: Detailed analytics retrieved successfully
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
 *                     salesData:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/SalesData'
 *                     productPerformance:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ProductPerformance'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/analytics', protect, requireRole('vendor'), async (req, res) => {
    try {
        const result = await vendorController.getDetailedAnalytics(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /vendor/products:
 *   get:
 *     summary: Get vendor products
 *     tags: [Vendor]
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
 *           enum: [draft, published, archived]
 *         description: Filter by product status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: Vendor products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/products', protect, requireRole('vendor'), async (req, res) => {
    try {
        const result = await vendorController.getVendorProducts(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /vendor/orders:
 *   get:
 *     summary: Get vendor orders
 *     tags: [Vendor]
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
 *         description: Vendor orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/orders', protect, requireRole('vendor'), async (req, res) => {
    try {
        const result = await vendorController.getVendorOrders(req.user.id, req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /vendor/{vendorId}/profile:
 *   put:
 *     summary: Update vendor profile
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *                 description: Business name
 *                 example: "Fresh Farm Produce"
 *               description:
 *                 type: string
 *                 description: Business description
 *                 example: "We provide fresh, organic vegetables and fruits"
 *               phone:
 *                 type: string
 *                 description: Business phone number
 *                 example: "+233-24-123-4567"
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "123 Market Street"
 *                   city:
 *                     type: string
 *                     example: "Accra"
 *                   state:
 *                     type: string
 *                     example: "Greater Accra"
 *                   zipCode:
 *                     type: string
 *                     example: "GA-123-4567"
 *                   country:
 *                     type: string
 *                     example: "Ghana"
 *               businessType:
 *                 type: string
 *                 description: Type of business
 *                 example: "Agriculture"
 *               website:
 *                 type: string
 *                 format: uri
 *                 description: Business website URL
 *                 example: "https://freshfarm.com"
 *               socialMedia:
 *                 type: object
 *                 description: Social media links
 *                 properties:
 *                   facebook:
 *                     type: string
 *                     example: "https://facebook.com/freshfarm"
 *                   twitter:
 *                     type: string
 *                     example: "https://twitter.com/freshfarm"
 *                   instagram:
 *                     type: string
 *                     example: "https://instagram.com/freshfarm"
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
 *       403:
 *         description: Forbidden - Can only update own profile
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */
router.put('/:vendorId/profile', protect, requireRole('vendor'), async (req, res) => {
    try {
        const { vendorId } = req.params;
        
        // Check if the authenticated user is trying to update their own profile
        if (req.user.id !== vendorId) {
            return res.status(403).json({ 
                success: false, 
                error: "You can only update your own profile" 
            });
        }
        
        const result = await vendorController.updateVendorProfile(vendorId, req.body);
        res.json(result);
    } catch (error) {
        if (error.message === 'Vendor not found') {
            res.status(404).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

module.exports = router;
