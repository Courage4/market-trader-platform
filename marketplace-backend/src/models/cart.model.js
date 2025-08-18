const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        variant: {
            type: mongoose.Schema.Types.ObjectId
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    summary: {
        subtotal: {
            type: Number,
            default: 0
        },
        shipping: {
            type: Number,
            default: 0
        },
        tax: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        discount: {
            type: Number,
            default: 0
        }
    },
    appliedCoupons: [{
        code: String,
        discount: Number,
        type: {
            type: String,
            enum: ['percentage', 'fixed']
        }
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
    let subtotal = 0;
    this.items.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    this.summary.subtotal = subtotal;
    this.summary.total = subtotal + this.summary.shipping + this.summary.tax - this.summary.discount;
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
