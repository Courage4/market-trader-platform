const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter category name'],
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please enter category description']
    },
    icon: {
        type: String
    },
    image: {
        type: String
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    attributes: [{
        name: String,
        values: [String]
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    metaTitle: String,
    metaDescription: String
}, {
    timestamps: true
});

// Create slug before saving
categorySchema.pre('save', function(next) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    next();
});

module.exports = mongoose.model('Category', categorySchema);
