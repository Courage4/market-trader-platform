const BaseController = require('./base.controller');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');

class VendorController extends BaseController {
    constructor() {
        super();
    }

    // Get vendor dashboard analytics
    async getDashboardAnalytics(vendorId) {
        try {
            // Get basic stats
            const [productStats, orderStats, revenueStats] = await Promise.all([
                this.getProductStats(vendorId),
                this.getOrderStats(vendorId),
                this.getRevenueStats(vendorId)
            ]);

            // Get recent activity
            const recentProducts = await this.getRecentProducts(vendorId);
            const recentOrders = await this.getRecentOrders(vendorId);

            // Get performance metrics
            const performanceMetrics = await this.getPerformanceMetrics(vendorId);

            return {
                success: true,
                data: {
                    stats: {
                        products: productStats,
                        orders: orderStats,
                        revenue: revenueStats
                    },
                    recentActivity: {
                        products: recentProducts,
                        orders: recentOrders
                    },
                    performance: performanceMetrics
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Get product statistics
    async getProductStats(vendorId) {
        try {
            const totalProducts = await Product.countDocuments({ vendor: vendorId });
            const activeProducts = await Product.countDocuments({ 
                vendor: vendorId, 
                status: 'published' 
            });
            const draftProducts = await Product.countDocuments({ 
                vendor: vendorId, 
                status: 'draft' 
            });
            const lowStockProducts = await Product.countDocuments({ 
                vendor: vendorId, 
                stock: { $lte: 10 } 
            });
            const outOfStockProducts = await Product.countDocuments({ 
                vendor: vendorId, 
                stock: 0 
            });

            // Get products added this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            
            const productsThisMonth = await Product.countDocuments({
                vendor: vendorId,
                createdAt: { $gte: startOfMonth }
            });

            return {
                total: totalProducts,
                active: activeProducts,
                draft: draftProducts,
                lowStock: lowStockProducts,
                outOfStock: outOfStockProducts,
                addedThisMonth: productsThisMonth
            };
        } catch (error) {
            throw error;
        }
    }

    // Get order statistics
    async getOrderStats(vendorId) {
        try {
            const totalOrders = await Order.countDocuments({
                'orderItems.vendor': vendorId
            });

            const pendingOrders = await Order.countDocuments({
                'orderItems.vendor': vendorId,
                status: 'pending'
            });

            const completedOrders = await Order.countDocuments({
                'orderItems.vendor': vendorId,
                status: 'completed'
            });

            const cancelledOrders = await Order.countDocuments({
                'orderItems.vendor': vendorId,
                status: 'cancelled'
            });

            // Get orders this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            
            const ordersThisMonth = await Order.countDocuments({
                'orderItems.vendor': vendorId,
                createdAt: { $gte: startOfMonth }
            });

            return {
                total: totalOrders,
                pending: pendingOrders,
                completed: completedOrders,
                cancelled: cancelledOrders,
                thisMonth: ordersThisMonth
            };
        } catch (error) {
            throw error;
        }
    }

    // Get revenue statistics
    async getRevenueStats(vendorId) {
        try {
            // Calculate total revenue from completed orders
            const revenueData = await Order.aggregate([
                {
                    $match: {
                        'orderItems.vendor': vendorId,
                        status: 'completed'
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalPrice' },
                        averageOrderValue: { $avg: '$totalPrice' }
                    }
                }
            ]);

            // Get revenue this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            
            const monthlyRevenue = await Order.aggregate([
                {
                    $match: {
                        'orderItems.vendor': vendorId,
                        status: 'completed',
                        createdAt: { $gte: startOfMonth }
                    }
                },
                {
                    $group: {
                        _id: null,
                        monthlyRevenue: { $sum: '$totalPrice' }
                    }
                }
            ]);

            // Get revenue by month for the last 6 months
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            
            const monthlyBreakdown = await Order.aggregate([
                {
                    $match: {
                        'orderItems.vendor': vendorId,
                        status: 'completed',
                        createdAt: { $gte: sixMonthsAgo }
                    }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        revenue: { $sum: '$totalPrice' },
                        orderCount: { $sum: 1 }
                    }
                },
                {
                    $sort: { '_id.year': 1, '_id.month': 1 }
                }
            ]);

            return {
                totalRevenue: revenueData[0]?.totalRevenue || 0,
                averageOrderValue: revenueData[0]?.averageOrderValue || 0,
                monthlyRevenue: monthlyRevenue[0]?.monthlyRevenue || 0,
                monthlyBreakdown: monthlyBreakdown
            };
        } catch (error) {
            throw error;
        }
    }

    // Get recent products
    async getRecentProducts(vendorId, limit = 5) {
        try {
            const products = await Product.find({ vendor: vendorId })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('category', 'name')
                .select('name price status stock createdAt');

            return products;
        } catch (error) {
            throw error;
        }
    }

    // Get recent orders
    async getRecentOrders(vendorId, limit = 5) {
        try {
            const orders = await Order.find({
                'orderItems.vendor': vendorId
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('buyer', 'name email')
            .select('orderNumber totalPrice status createdAt');

            return orders;
        } catch (error) {
            throw error;
        }
    }

    // Get performance metrics
    async getPerformanceMetrics(vendorId) {
        try {
            // Get conversion rate (orders per product view)
            const productViews = await Product.aggregate([
                { $match: { vendor: vendorId } },
                { $group: { _id: null, totalViews: { $sum: '$views' } } }
            ]);

            const totalOrders = await Order.countDocuments({
                'orderItems.vendor': vendorId,
                status: 'completed'
            });

            const conversionRate = productViews[0]?.totalViews > 0 
                ? (totalOrders / productViews[0].totalViews * 100).toFixed(2)
                : 0;

            // Get average rating
            const ratingData = await Product.aggregate([
                { $match: { vendor: vendorId } },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: '$rating' },
                        totalReviews: { $sum: '$reviewCount' }
                    }
                }
            ]);

            // Get top performing products
            const topProducts = await Product.find({ vendor: vendorId })
                .sort({ views: -1 })
                .limit(5)
                .select('name views rating salesCount');

            return {
                conversionRate: parseFloat(conversionRate),
                averageRating: ratingData[0]?.averageRating || 0,
                totalReviews: ratingData[0]?.totalReviews || 0,
                topProducts: topProducts
            };
        } catch (error) {
            throw error;
        }
    }

    // Get detailed analytics with filters
    async getDetailedAnalytics(vendorId, filters = {}) {
        try {
            const { 
                startDate, 
                endDate, 
                category, 
                status,
                groupBy = 'day'
            } = filters;

            let match = { 'orderItems.vendor': vendorId };

            // Apply date filters
            if (startDate && endDate) {
                match.createdAt = {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                };
            }

            // Apply status filter
            if (status) {
                match.status = status;
            }

            // Get sales data
            const salesData = await Order.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: this.getGroupByExpression(groupBy),
                        totalSales: { $sum: '$totalPrice' },
                        orderCount: { $sum: 1 },
                        averageOrderValue: { $avg: '$totalPrice' }
                    }
                },
                { $sort: { '_id': 1 } }
            ]);

            // Get product performance
            const productPerformance = await Order.aggregate([
                { $match: match },
                { $unwind: '$orderItems' },
                {
                    $group: {
                        _id: '$orderItems.product',
                        totalSales: { $sum: '$orderItems.price' },
                        quantitySold: { $sum: '$orderItems.quantity' }
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                { $unwind: '$product' },
                {
                    $project: {
                        productName: '$product.name',
                        totalSales: 1,
                        quantitySold: 1
                    }
                },
                { $sort: { totalSales: -1 } },
                { $limit: 10 }
            ]);

            return {
                success: true,
                data: {
                    salesData,
                    productPerformance
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Get vendor products with pagination
    async getVendorProducts(vendorId, query = {}) {
        try {
            const { page = 1, limit = 10, status, category } = query;
            let filter = { vendor: vendorId };
            
            if (status) filter.status = status;
            if (category) filter.category = category;
            
            return await this.getAll(filter, { 
                page, 
                limit, 
                populate: 'category',
                sort: { createdAt: -1 }
            });
        } catch (error) {
            throw error;
        }
    }

    // Get vendor orders with pagination
    async getVendorOrders(vendorId, query = {}) {
        try {
            const { page = 1, limit = 10, status } = query;
            let filter = { 'orderItems.vendor': vendorId };
            
            if (status) filter.status = status;
            
            const skip = (page - 1) * limit;
            
            const orders = await Order.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .populate('buyer', 'name email')
                .populate('orderItems.product', 'name price images');

            const total = await Order.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);

            return {
                success: true,
                data: {
                    orders,
                    pagination: {
                        currentPage: parseInt(page),
                        totalPages,
                        totalItems: total,
                        itemsPerPage: parseInt(limit)
                    }
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Update vendor profile
    async updateVendorProfile(vendorId, updateData) {
        try {
            const allowedFields = [
                'businessName', 
                'description', 
                'phone', 
                'address',
                'businessType',
                'website',
                'socialMedia'
            ];
            
            // Filter only allowed fields
            const filteredData = {};
            Object.keys(updateData).forEach(key => {
                if (allowedFields.includes(key)) {
                    filteredData[key] = updateData[key];
                }
            });

            const updatedVendor = await User.findByIdAndUpdate(
                vendorId,
                { $set: filteredData },
                { new: true, runValidators: true }
            ).select('-password');

            if (!updatedVendor) {
                throw new Error('Vendor not found');
            }

            return {
                success: true,
                message: 'Profile updated successfully',
                data: updatedVendor
            };
        } catch (error) {
            throw error;
        }
    }

    // Helper method to get group by expression
    getGroupByExpression(groupBy) {
        switch (groupBy) {
            case 'hour':
                return {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' },
                    hour: { $hour: '$createdAt' }
                };
            case 'day':
                return {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' }
                };
            case 'week':
                return {
                    year: { $year: '$createdAt' },
                    week: { $week: '$createdAt' }
                };
            case 'month':
                return {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                };
            default:
                return {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' }
                };
        }
    }
}

module.exports = new VendorController();