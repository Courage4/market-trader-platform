const BaseController = require('./base.controller');
const Product = require('../models/product.model');

class ProductController extends BaseController {
    constructor() {
        super(Product);
    }

    // Search products with filters
    async searchProducts(query) {
        try {
            const {
                keyword,
                category,
                minPrice,
                maxPrice,
                rating,
                vendor,
                inStock,
                page = 1,
                limit = 10
            } = query;

            let filter = {};

            // Keyword search in name and description
            if (keyword) {
                filter.$or = [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ];
            }

            // Category filter
            if (category) {
                filter.category = category;
            }

            // Price range
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = parseFloat(minPrice);
                if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
            }

            // Rating filter
            if (rating) {
                filter['ratings.average'] = { $gte: parseFloat(rating) };
            }

            // Vendor filter
            if (vendor) {
                filter.vendor = vendor;
            }

            // Stock filter
            if (inStock === 'true') {
                filter.stock = { $gt: 0 };
            }

            return await this.getAll(filter, {
                page,
                limit,
                populate: 'category vendor',
                sort: { createdAt: -1 }
            });
        } catch (error) {
            throw error;
        }
    }

    // Add review to product
    async addReview(productId, reviewData) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            // Add review
            product.reviews.push(reviewData);

            // Update ratings
            const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
            product.ratings.average = totalRatings / product.reviews.length;
            product.ratings.count = product.reviews.length;
            
            // Update rating distribution
            product.ratings.distribution[reviewData.rating]++;

            await product.save();
            return { success: true, data: product };
        } catch (error) {
            throw error;
        }
    }

    // Update product stock
    async updateStock(productId, quantity) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            product.stock += quantity;
            if (product.stock < 0) {
                throw new Error('Insufficient stock');
            }

            await product.save();
            return { success: true, data: product };
        } catch (error) {
            throw error;
        }
    }

    // Get featured products
    async getFeaturedProducts(limit = 10) {
        try {
            const products = await Product.find({ isFeatured: true })
                .populate('category vendor')
                .limit(limit)
                .sort({ 'ratings.average': -1 });

            return { success: true, data: products };
        } catch (error) {
            throw error;
        }
    }

    // Get vendor products
    async getVendorProducts(vendorId, query = {}) {
        try {
            const { page = 1, limit = 10 } = query;
            return await this.getAll(
                { vendor: vendorId },
                { page, limit, populate: 'category' }
            );
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductController();
