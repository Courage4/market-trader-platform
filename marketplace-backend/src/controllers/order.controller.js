const BaseController = require('./base.controller');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

class OrderController extends BaseController {
    constructor() {
        super(Order);
    }

    // Create order from cart
    async createFromCart(userId, orderData) {
        try {
            // Get user's cart
            const cart = await Cart.findOne({ user: userId })
                .populate('items.product');
            
            if (!cart || cart.items.length === 0) {
                throw new Error('Cart is empty');
            }

            // Validate stock
            for (const item of cart.items) {
                if (item.quantity > item.product.stock) {
                    throw new Error(`Insufficient stock for ${item.product.name}`);
                }
            }

            // Create order items
            const orderItems = cart.items.map(item => ({
                product: item.product._id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.price,
                vendor: item.product.vendor
            }));

            // Create order
            const order = await Order.create({
                user: userId,
                orderItems,
                shippingAddress: orderData.shippingAddress,
                paymentMethod: orderData.paymentMethod,
                itemsPrice: cart.summary.subtotal,
                shippingPrice: cart.summary.shipping,
                totalPrice: cart.summary.total
            });

            // Update product stock
            for (const item of cart.items) {
                await Product.findByIdAndUpdate(item.product._id, {
                    $inc: { stock: -item.quantity }
                });
            }

            // Clear cart
            await Cart.findByIdAndDelete(cart._id);

            return { success: true, data: order };
        } catch (error) {
            throw error;
        }
    }

    // Update order status
    async updateStatus(orderId, status) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found');
            }

            order.status = status;
            await order.save();

            return { success: true, data: order };
        } catch (error) {
            throw error;
        }
    }

    // Get user orders
    async getUserOrders(userId, query = {}) {
        try {
            const { page = 1, limit = 10 } = query;
            return await this.getAll(
                { user: userId },
                { 
                    page, 
                    limit,
                    sort: { createdAt: -1 },
                    populate: 'orderItems.product'
                }
            );
        } catch (error) {
            throw error;
        }
    }

    // Get vendor orders
    async getVendorOrders(vendorId, query = {}) {
        try {
            const { page = 1, limit = 10, status } = query;
            let filter = {
                'orderItems.vendor': vendorId
            };

            if (status) {
                filter.status = status;
            }

            return await this.getAll(
                filter,
                { 
                    page, 
                    limit,
                    sort: { createdAt: -1 },
                    populate: 'user orderItems.product'
                }
            );
        } catch (error) {
            throw error;
        }
    }

    // Get order statistics
    async getOrderStats(vendorId = null) {
        try {
            let match = {};
            if (vendorId) {
                match['orderItems.vendor'] = vendorId;
            }

            const stats = await Order.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: null,
                        totalOrders: { $sum: 1 },
                        totalSales: { $sum: '$totalPrice' },
                        averageOrderValue: { $avg: '$totalPrice' }
                    }
                }
            ]);

            const ordersByStatus = await Order.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);

            return {
                success: true,
                data: {
                    stats: stats[0],
                    ordersByStatus
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new OrderController();
