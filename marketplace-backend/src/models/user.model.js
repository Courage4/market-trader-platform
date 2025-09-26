const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['buyer', 'vendor', 'admin', 'super_admin'],
        default: 'buyer'
    },
    avatar: {
        type: String,
        default: 'default-avatar.jpg'
    },
    phoneNumber: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    businessInfo: {
        businessName: String,
        businessDescription: String,
        businessLogo: String,
        businessAddress: {
            street: String,
            city: String,
            state: String,
            country: String,
            zipCode: String
        },
        businessPhone: String,
        businessEmail: String,
        taxId: String,
        paymentInfo: {
            accountHolder: String,
            accountNumber: String,
            bankName: String,
            swiftCode: String
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: Date,
    preferences: {
        notifications: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false },
            push: { type: Boolean, default: true }
        },
        language: { type: String, default: 'en' },
        currency: { type: String, default: 'USD' }
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    favoriteVendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
