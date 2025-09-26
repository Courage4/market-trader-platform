const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - vendor
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *           example: "64f8a1b2c3d4e5f6a7b8c9d2"
 *         name:
 *           type: string
 *           description: The product name
 *           example: "iPhone 15 Pro"
 *         slug:
 *           type: string
 *           description: URL-friendly version of the name
 *           example: "iphone-15-pro"
 *         sku:
 *           type: string
 *           description: Stock Keeping Unit
 *           example: "SKU-001"
 *         description:
 *           type: string
 *           description: Detailed product description
 *           example: "Latest iPhone with advanced camera system and A17 Pro chip"
 *         shortDescription:
 *           type: string
 *           maxLength: 200
 *           description: Brief product description
 *           example: "Advanced smartphone with premium features"
 *         price:
 *           type: number
 *           description: Product price
 *           example: 999.99
 *         comparePrice:
 *           type: number
 *           description: Original price for comparison
 *           example: 1099.99
 *         category:
 *           type: string
 *           description: Category ID
 *           example: "64f8a1b2c3d4e5f6a7b8c9d1"
 *         vendor:
 *           type: string
 *           description: Vendor ID
 *           example: "64f8a1b2c3d4e5f6a7b8c9d3"
 *         brand:
 *           type: string
 *           description: Product brand
 *           example: "Apple"
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "iphone15pro-1.jpg"
 *               alt:
 *                 type: string
 *                 example: "iPhone 15 Pro front view"
 *               isPrimary:
 *                 type: boolean
 *                 example: true
 *         attributes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Display"
 *               value:
 *                 type: string
 *                 example: "6.1-inch Super Retina XDR"
 *         stock:
 *           type: number
 *           description: Available stock quantity
 *           example: 50
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *           description: Product status
 *           example: "published"
 *         isActive:
 *           type: boolean
 *           description: Whether product is active
 *           example: true
 *         isFeatured:
 *           type: boolean
 *           description: Whether product is featured
 *           example: true
 *         ratings:
 *           type: object
 *           properties:
 *             average:
 *               type: number
 *               example: 4.5
 *             count:
 *               type: number
 *               example: 128
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["smartphone", "apple", "premium"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Product'
 *     ProductsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             total:
 *               type: integer
 *               example: 25
 *             pages:
 *               type: integer
 *               example: 3
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           description: User ID
 *         name:
 *           type: string
 *           description: User name
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         title:
 *           type: string
 *         comment:
 *           type: string
 *         isVerifiedPurchase:
 *           type: boolean
 *         helpfulVotes:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products with filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword
 *         example: "iPhone"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID filter
 *         example: "64f8a1b2c3d4e5f6a7b8c9d1"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *         example: 100
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *         example: 1000
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         description: Minimum rating filter
 *         example: 4.0
 *       - in: query
 *         name: vendor
 *         schema:
 *           type: string
 *         description: Vendor ID filter
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *         description: Filter by stock availability
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
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search', async (req, res) => {
    try {
        const result = await productController.searchProducts(req.query);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of featured products to return
 *         example: 5
 *     responses:
 *       200:
 *         description: Featured products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/featured', async (req, res) => {
    try {
        const result = await productController.getFeaturedProducts(req.query.limit);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
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
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, -price, createdAt, -createdAt, rating, -rating]
 *         description: Sort field and direction
 *         example: "-createdAt"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published, archived]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async (req, res) => {
    try {
        const result = await productController.getAll(req.query);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d2"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               description:
 *                 type: string
 *                 example: "Latest iPhone with advanced camera system and A17 Pro chip"
 *               shortDescription:
 *                 type: string
 *                 maxLength: 200
 *                 example: "Advanced smartphone with premium features"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               comparePrice:
 *                 type: number
 *                 example: 1099.99
 *               category:
 *                 type: string
 *                 example: "64f8a1b2c3d4e5f6a7b8c9d1"
 *               brand:
 *                 type: string
 *                 example: "Apple"
 *               stock:
 *                 type: number
 *                 example: 50
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *                 example: "published"
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: "iphone15pro-1.jpg"
 *                     alt:
 *                       type: string
 *                       example: "iPhone 15 Pro front view"
 *                     isPrimary:
 *                       type: boolean
 *                       example: true
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Display"
 *                     value:
 *                       type: string
 *                       example: "6.1-inch Super Retina XDR"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["smartphone", "apple", "premium"]
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               isFeatured:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro Max"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               price:
 *                 type: number
 *                 example: 1099.99
 *               stock:
 *                 type: number
 *                 example: 25
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *                 example: "published"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authorize('vendor', 'admin'), async (req, res) => {
    try {
        const result = await productController.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d2"
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                   example: "Product deleted successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', authorize('vendor', 'admin'), async (req, res) => {
    try {
        const result = await productController.delete(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /products/{id}/reviews:
 *   post:
 *     summary: Add a review to a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               title:
 *                 type: string
 *                 example: "Excellent product!"
 *               comment:
 *                 type: string
 *                 example: "Great quality and fast delivery. Highly recommended!"
 *               isVerifiedPurchase:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /products/vendor/{vendorId}:
 *   get:
 *     summary: Get products by vendor
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *         example: "64f8a1b2c3d4e5f6a7b8c9d3"
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
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: Vendor products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Vendor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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