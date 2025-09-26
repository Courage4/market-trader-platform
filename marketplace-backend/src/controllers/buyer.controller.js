const BaseController = require('./base.controller');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Cart = require('../models/cart.model');

class BuyerController extends BaseController {
    constructor() {
        super();
    }

    // Get buyer dashboard analytics
    async getDashboardAnalytics(buyerId) {
        try {
            // Get basic stats
            const [orderStats, favoriteStats, cartStats] = await Promise.all([
                this.getOrderStats(buyerId),
                this.getFavoriteStats(buyerId),
                this.getCartStats(buyerId)
            ]);

            // Get recent activity
            const recentOrders = await this.getRecentOrders(buyerId);
            const recentFavorites = await this.getRecentFavorites(buyerId);

            // Get spending analytics
            const spendingAnalytics = await this.getSpendingAnalytics(buyerId);

            return {
                success: true,
                data: {
                    stats: {
                        orders: orderStats,
                        favorites: favoriteStats,
                        cart: cartStats
                    },
                    recentActivity: {
                        orders: recentOrders,
                        favorites: recentFavorites
                    },
                    spending: spendingAnalytics
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Get order statistics
    async getOrderStats(buyerId) {
        try {
            const totalOrders = await Order.countDocuments({ buyer: buyerId });
            const pendingOrders = await Order.countDocuments({ 
                buyer: buyerId, 
                status: 'pending' 
            });
            const completedOrders = await Order.countDocuments({ 
                buyer: buyerId, 
                status: 'completed' 
            });
            const cancelledOrders = await Order.countDocuments({ 
                buyer: buyerId, 
                status: 'cancelled' 
            });

            // Get orders this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            
            const ordersThisMonth = await Order.countDocuments({
                buyer: buyerId,
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

    // Get favorite statistics
    async getFavoriteStats(buyerId) {
        try {
            const user = await User.findById(buyerId).populate('favorites');
            const favoriteProducts = user.favorites ? user.favorites.length : 0;
            
            // Get favorite vendors count
            const favoriteVendors = await User.countDocuments({
                _id: { $in: user.favoriteVendors || [] }
            });

            return {
                products: favoriteProducts,
                vendors: favoriteVendors,
                total: favoriteProducts + favoriteVendors
            };
        } catch (error) {
            throw error;
        }
    }

    // Get cart statistics
    async getCartStats(buyerId) {
        try {
            const cart = await Cart.findOne({ user: buyerId }).populate('items.product');
            const totalItems = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
            const totalValue = cart ? cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) : 0;
            const uniqueProducts = cart ? cart.items.length : 0;

            return {
                totalItems,
                totalValue,
                uniqueProducts
            };
        } catch (error) {
            throw error;
        }
    }

    // Get recent orders
    async getRecentOrders(buyerId, limit = 5) {
        try {
            const orders = await Order.find({ buyer: buyerId })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('orderItems.product', 'name price images')
                .select('orderNumber totalPrice status createdAt');

            return orders;
        } catch (error) {
            throw error;
        }
    }

    // Get recent favorites
    async getRecentFavorites(buyerId, limit = 5) {
        try {
            const user = await User.findById(buyerId).populate({
                path: 'favorites',
                options: { sort: { createdAt: -1 }, limit: limit }
            });

            return user.favorites || [];
        } catch (error) {
            throw error;
        }
    }

    // Get spending analytics
    async getSpendingAnalytics(buyerId) {
        try {
            // Calculate total spending
            const totalSpending = await Order.aggregate([
                { $match: { buyer: buyerId, status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$totalPrice' } } }
            ]);

            // Get spending this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            
            const monthlySpending = await Order.aggregate([
                { 
                    $match: { 
                        buyer: buyerId, 
                        status: 'completed',
                        createdAt: { $gte: startOfMonth }
                    } 
                },
                { $group: { _id: null, total: { $sum: '$totalPrice' } } }
            ]);

            // Get spending by month for the last 6 months
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            
            const monthlyBreakdown = await Order.aggregate([
                {
                    $match: {
                        buyer: buyerId,
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
                        totalSpent: { $sum: '$totalPrice' },
                        orderCount: { $sum: 1 }
                    }
                },
                {
                    $sort: { '_id.year': 1, '_id.month': 1 }
                }
            ]);

            return {
                totalSpent: totalSpending[0]?.total || 0,
                monthlySpent: monthlySpending[0]?.total || 0,
                monthlyBreakdown: monthlyBreakdown
            };
        } catch (error) {
            throw error;
        }
    }

    // Get buyer orders with pagination
    async getBuyerOrders(buyerId, query = {}) {
        try {
            const { page = 1, limit = 10, status } = query;
            let filter = { buyer: buyerId };
            
            if (status) filter.status = status;
            
            const skip = (page - 1) * limit;
            
            const orders = await Order.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .populate('orderItems.product', 'name price images')
                .populate('orderItems.vendor', 'name email');

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

    // Get buyer favorites
    async getBuyerFavorites(buyerId, query = {}) {
        try {
            const { page = 1, limit = 10, type } = query;
            
            const user = await User.findById(buyerId).populate({
                path: 'favorites',
                match: type ? { type } : {},
                options: { 
                    sort: { createdAt: -1 },
                    skip: (page - 1) * limit,
                    limit: parseInt(limit)
                }
            });

            const total = await User.findById(buyerId).populate({
                path: 'favorites',
                match: type ? { type } : {},
                select: '_id'
            });

            const totalPages = Math.ceil((total.favorites?.length || 0) / limit);

            return {
                success: true,
                data: {
                    favorites: user.favorites || [],
                    pagination: {
                        currentPage: parseInt(page),
                        totalPages,
                        totalItems: total.favorites?.length || 0,
                        itemsPerPage: parseInt(limit)
                    }
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Add to favorites
    async addToFavorites(buyerId, productId) {
        try {
            const user = await User.findById(buyerId);
            if (!user.favorites) {
                user.favorites = [];
            }
            
            if (!user.favorites.includes(productId)) {
                user.favorites.push(productId);
                await user.save();
            }

            return {
                success: true,
                message: 'Product added to favorites',
                data: { productId }
            };
        } catch (error) {
            throw error;
        }
    }

    // Remove from favorites
    async removeFromFavorites(buyerId, productId) {
        try {
            const user = await User.findById(buyerId);
            if (user.favorites) {
                user.favorites = user.favorites.filter(id => id.toString() !== productId);
                await user.save();
            }

            return {
                success: true,
                message: 'Product removed from favorites',
                data: { productId }
            };
        } catch (error) {
            throw error;
        }
    }

    // Get buyer cart
    async getBuyerCart(buyerId) {
        try {
            let cart = await Cart.findOne({ user: buyerId }).populate('items.product');
            
            if (!cart) {
                cart = new Cart({ user: buyerId, items: [] });
                await cart.save();
            }

            return {
                success: true,
                data: cart
            };
        } catch (error) {
            throw error;
        }
    }

    // Add to cart
    async addToCart(buyerId, productId, quantity = 1) {
        try {
            let cart = await Cart.findOne({ user: buyerId });
            
            if (!cart) {
                cart = new Cart({ user: buyerId, items: [] });
            }

            const existingItem = cart.items.find(item => item.product.toString() === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
            await cart.populate('items.product');

            return {
                success: true,
                message: 'Product added to cart',
                data: cart
            };
        } catch (error) {
            throw error;
        }
    }

    // Update cart item quantity
    async updateCartItem(buyerId, productId, quantity) {
        try {
            const cart = await Cart.findOne({ user: buyerId });
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            const item = cart.items.find(item => item.product.toString() === productId);
            
            if (!item) {
                throw new Error('Item not found in cart');
            }

            if (quantity <= 0) {
                cart.items = cart.items.filter(item => item.product.toString() !== productId);
            } else {
                item.quantity = quantity;
            }

            await cart.save();
            await cart.populate('items.product');

            return {
                success: true,
                message: 'Cart updated',
                data: cart
            };
        } catch (error) {
            throw error;
        }
    }

    // Remove from cart
    async removeFromCart(buyerId, productId) {
        try {
            const cart = await Cart.findOne({ user: buyerId });
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();
            await cart.populate('items.product');

            return {
                success: true,
                message: 'Product removed from cart',
                data: cart
            };
        } catch (error) {
            throw error;
        }
    }

    // Clear cart
    async clearCart(buyerId) {
        try {
            const cart = await Cart.findOne({ user: buyerId });
            
            if (cart) {
                cart.items = [];
                await cart.save();
            }

            return {
                success: true,
                message: 'Cart cleared',
                data: cart || { user: buyerId, items: [] }
            };
        } catch (error) {
            throw error;
        }
    }

    // Update buyer profile
    async updateBuyerProfile(buyerId, updateData) {
        try {
            const allowedFields = [
                'name', 
                'email', 
                'phoneNumber', 
                'address',
                'dateOfBirth',
                'preferences'
            ];
            
            // Filter only allowed fields
            const filteredData = {};
            Object.keys(updateData).forEach(key => {
                if (allowedFields.includes(key)) {
                    filteredData[key] = updateData[key];
                }
            });

            const updatedBuyer = await User.findByIdAndUpdate(
                buyerId,
                { $set: filteredData },
                { new: true, runValidators: true }
            ).select('-password');

            if (!updatedBuyer) {
                throw new Error('Buyer not found');
            }

            return {
                success: true,
                message: 'Profile updated successfully',
                data: updatedBuyer
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BuyerController();