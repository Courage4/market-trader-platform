const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Promotion = require('../models/promotion.model');

class CartController {
    // Get cart
    async getCart(userId) {
        try {
            let cart = await Cart.findOne({ user: userId })
                .populate('items.product', 'name price images stock');

            if (!cart) {
                cart = await Cart.create({ user: userId, items: [] });
            }

            return { success: true, data: cart };
        } catch (error) {
            throw error;
        }
    }

    // Add item to cart
    async addItem(userId, { productId, quantity = 1 }) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            if (product.stock < quantity) {
                throw new Error('Insufficient stock');
            }

            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = await Cart.create({ user: userId, items: [] });
            }

            // Check if product already exists in cart
            const existingItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingItem) {
                // Update quantity if product exists
                if (product.stock < existingItem.quantity + quantity) {
                    throw new Error('Insufficient stock');
                }
                existingItem.quantity += quantity;
                existingItem.price = product.price;
            } else {
                // Add new item if product doesn't exist
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.price
                });
            }

            await this.updateCartTotals(cart);
            await cart.save();

            return { success: true, data: cart };
        } catch (error) {
            throw error;
        }
    }

    // Update cart item quantity
    async updateItemQuantity(userId, { productId, quantity }) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            if (product.stock < quantity) {
                throw new Error('Insufficient stock');
            }

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            const cartItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (!cartItem) {
                throw new Error('Item not found in cart');
            }

            cartItem.quantity = quantity;
            cartItem.price = product.price;

            await this.updateCartTotals(cart);
            await cart.save();

            return { success: true, data: cart };
        } catch (error) {
            throw error;
        }
    }

    // Remove item from cart
    async removeItem(userId, productId) {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = cart.items.filter(
                item => item.product.toString() !== productId
            );

            await this.updateCartTotals(cart);
            await cart.save();

            return { success: true, data: cart };
        } catch (error) {
            throw error;
        }
    }

    // Clear cart
    async clearCart(userId) {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = [];
            cart.summary = {
                subtotal: 0,
                shipping: 0,
                tax: 0,
                total: 0,
                discount: 0
            };
            cart.appliedCoupons = [];

            await cart.save();

            return { success: true, data: cart };
        } catch (error) {
            throw error;
        }
    }

    // Apply coupon
    async applyCoupon(userId, couponCode) {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            const promotion = await Promotion.findOne({
                code: couponCode.toUpperCase(),
                isActive: true,
                startDate: { $lte: new Date() },
                endDate: { $gte: new Date() }
            });

            if (!promotion) {
                throw new Error('Invalid or expired coupon');
            }

            // Check if coupon is already applied
            if (cart.appliedCoupons.some(coupon => coupon.code === couponCode)) {
                throw new Error('Coupon already applied');
            }

            // Check minimum purchase requirement
            if (cart.summary.subtotal < promotion.minimumPurchase) {
                throw new Error(`Minimum purchase of $${promotion.minimumPurchase} required`);
            }

            // Calculate discount
            let discount = 0;
            if (promotion.type === 'percentage') {
                discount = (cart.summary.subtotal * promotion.value) / 100;
            } else if (promotion.type === 'fixed') {
                discount = promotion.value;
            }

            // Apply maximum discount limit if set
            if (promotion.maximumDiscount && discount > promotion.maximumDiscount) {
                discount = promotion.maximumDiscount;
            }

            cart.appliedCoupons.push({
                code: promotion.code,
                discount,
                type: promotion.type
            });

            await this.updateCartTotals(cart);
            await cart.save();

            return { success: true, data: cart };
        } catch (error) {
            throw error;
        }
    }

    // Remove coupon
    async removeCoupon(userId, couponCode) {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.appliedCoupons = cart.appliedCoupons.filter(
                coupon => coupon.code !== couponCode.toUpperCase()
            );

            await this.updateCartTotals(cart);
            await cart.save();

            return { success: true, data: cart };
        } catch (error) {
            throw error;
        }
    }

    // Update cart totals
    async updateCartTotals(cart) {
        // Calculate subtotal
        cart.summary.subtotal = cart.items.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );

        // Calculate shipping (example logic)
        cart.summary.shipping = cart.summary.subtotal > 100 ? 0 : 10;

        // Calculate tax (example: 10%)
        cart.summary.tax = cart.summary.subtotal * 0.1;

        // Calculate discount
        cart.summary.discount = cart.appliedCoupons.reduce(
            (total, coupon) => total + coupon.discount,
            0
        );

        // Calculate total
        cart.summary.total = (
            cart.summary.subtotal +
            cart.summary.shipping +
            cart.summary.tax -
            cart.summary.discount
        );
    }
}

module.exports = new CartController();
