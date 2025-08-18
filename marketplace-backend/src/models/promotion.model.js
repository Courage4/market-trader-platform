const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    type: {
        type: String,
        enum: ['percentage', 'fixed', 'buy_x_get_y', 'free_shipping'],
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minimumPurchase: {
        type: Number,
        default: 0
    },
    maximumDiscount: {
        type: Number
    },
    usageLimit: {
        perUser: {
            type: Number,
            default: 1
        },
        total: {
            type: Number
        }
    },
    usageCount: {
        type: Number,
        default: 0
    },
    applicableTo: {
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
        vendors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    conditions: {
        userGroups: [{
            type: String,
            enum: ['new', 'regular', 'vip']
        }],
        paymentMethods: [String],
        locations: [String]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    description: String,
    termsAndConditions: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Promotion', promotionSchema);
