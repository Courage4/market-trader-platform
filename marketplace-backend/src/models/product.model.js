const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        sparse: true
    },
    sku: {
        type: String,
        unique: true,
        sparse: true
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

// Pre-save middleware to auto-generate slug and SKU if not provided
productSchema.pre('save', function(next) {
    // Always generate slug if not provided or empty
    if (!this.slug && this.name) {
        // Generate slug from name
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        
        // Add timestamp to ensure uniqueness
        this.slug += '-' + Date.now();
    }
    
    // Always generate SKU if not provided or empty
    if (!this.sku && this.name) {
        // Generate SKU from name and timestamp
        const skuPrefix = this.name
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .substring(0, 6);
        this.sku = skuPrefix + '-' + Date.now();
    }
    
    next();
});

module.exports = mongoose.model('Product', productSchema);
