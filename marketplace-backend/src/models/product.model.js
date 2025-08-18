const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    sku: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    shortDescription: {
        type: String,
        maxLength: 200
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        min: 0
    },
    comparePrice: {
        type: Number,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brand: {
        type: String
    },
    images: [{
        url: String,
        alt: String,
        isPrimary: Boolean
    }],
    attributes: [{
        name: String,
        value: String
    }],
    variants: [{
        sku: String,
        attributes: [{
            name: String,
            value: String
        }],
        price: Number,
        stock: Number,
        images: [{
            url: String,
            alt: String
        }]
    }],
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        min: 0,
        default: 0
    },
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        },
        distribution: {
            1: { type: Number, default: 0 },
            2: { type: Number, default: 0 },
            3: { type: Number, default: 0 },
            4: { type: Number, default: 0 },
            5: { type: Number, default: 0 }
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        title: String,
        comment: String,
        images: [{
            url: String,
            alt: String
        }],
        isVerifiedPurchase: {
            type: Boolean,
            default: false
        },
        helpfulVotes: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [String],
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    },
    shipping: {
        weight: Number,
        dimensions: {
            length: Number,
            width: Number,
            height: Number
        },
        freeShipping: {
            type: Boolean,
            default: false
        }
    },
    warranty: {
        available: {
            type: Boolean,
            default: false
        },
        duration: String,
        description: String
    },
    salesData: {
        totalSales: {
            type: Number,
            default: 0
        },
        lastSaleDate: Date,
        viewCount: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
