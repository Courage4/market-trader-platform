const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guaso');
        console.log('MongoDB Connected for seeding...');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

// Sample categories
const categories = [
    { name: 'Electronics', description: 'Electronic devices and gadgets' },
    { name: 'Clothing', description: 'Fashion and apparel' },
    { name: 'Home & Garden', description: 'Home improvement and garden supplies' },
    { name: 'Sports', description: 'Sports equipment and accessories' },
    { name: 'Books', description: 'Books and educational materials' }
];

// Sample products
const products = [
    {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip',
        price: 999.99,
        comparePrice: 1099.99,
        brand: 'Apple',
        stock: 50,
        status: 'published',
        images: [
            { url: 'iphone15pro-1.jpg', alt: 'iPhone 15 Pro front view', isPrimary: true },
            { url: 'iphone15pro-2.jpg', alt: 'iPhone 15 Pro back view', isPrimary: false }
        ],
        attributes: [
            { name: 'Display', value: '6.1-inch Super Retina XDR' },
            { name: 'Storage', value: '128GB' },
            { name: 'Color', value: 'Natural Titanium' }
        ]
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android smartphone with S Pen and advanced AI features',
        price: 1199.99,
        comparePrice: 1299.99,
        brand: 'Samsung',
        stock: 30,
        status: 'published',
        images: [
            { url: 'galaxy-s24-ultra-1.jpg', alt: 'Samsung Galaxy S24 Ultra front', isPrimary: true },
            { url: 'galaxy-s24-ultra-2.jpg', alt: 'Samsung Galaxy S24 Ultra back', isPrimary: false }
        ],
        attributes: [
            { name: 'Display', value: '6.8-inch Dynamic AMOLED 2X' },
            { name: 'Storage', value: '256GB' },
            { name: 'Color', value: 'Titanium Black' }
        ]
    },
    {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Max Air cushioning',
        price: 150.00,
        comparePrice: 180.00,
        brand: 'Nike',
        stock: 100,
        status: 'published',
        images: [
            { url: 'nike-airmax-270-1.jpg', alt: 'Nike Air Max 270 side view', isPrimary: true }
        ],
        attributes: [
            { name: 'Size', value: 'Available in 7-12' },
            { name: 'Color', value: 'Black/White' },
            { name: 'Material', value: 'Mesh and synthetic' }
        ]
    },
    {
        name: 'MacBook Pro 16-inch',
        description: 'Powerful laptop for professionals with M3 Pro chip',
        price: 2499.99,
        comparePrice: 2699.99,
        brand: 'Apple',
        stock: 25,
        status: 'published',
        images: [
            { url: 'macbook-pro-16-1.jpg', alt: 'MacBook Pro 16-inch open', isPrimary: true },
            { url: 'macbook-pro-16-2.jpg', alt: 'MacBook Pro 16-inch closed', isPrimary: false }
        ],
        attributes: [
            { name: 'Processor', value: 'Apple M3 Pro' },
            { name: 'Memory', value: '18GB RAM' },
            { name: 'Storage', value: '512GB SSD' },
            { name: 'Display', value: '16.2-inch Liquid Retina XDR' }
        ]
    },
    {
        name: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise canceling wireless headphones',
        price: 399.99,
        comparePrice: 449.99,
        brand: 'Sony',
        stock: 75,
        status: 'published',
        images: [
            { url: 'sony-wh1000xm5-1.jpg', alt: 'Sony WH-1000XM5 headphones', isPrimary: true }
        ],
        attributes: [
            { name: 'Battery', value: '30 hours' },
            { name: 'Connectivity', value: 'Bluetooth 5.2' },
            { name: 'Weight', value: '250g' }
        ]
    },
    {
        name: 'Dyson V15 Detect Vacuum',
        description: 'Cordless vacuum with laser dust detection',
        price: 649.99,
        comparePrice: 699.99,
        brand: 'Dyson',
        stock: 40,
        status: 'published',
        images: [
            { url: 'dyson-v15-1.jpg', alt: 'Dyson V15 Detect vacuum', isPrimary: true },
            { url: 'dyson-v15-2.jpg', alt: 'Dyson V15 accessories', isPrimary: false }
        ],
        attributes: [
            { name: 'Runtime', value: '60 minutes' },
            { name: 'Bin', value: '0.77L' },
            { name: 'Weight', value: '3.0kg' }
        ]
    },
    {
        name: 'KitchenAid Stand Mixer',
        description: 'Professional-grade stand mixer for baking enthusiasts',
        price: 329.99,
        comparePrice: 399.99,
        brand: 'KitchenAid',
        stock: 60,
        status: 'published',
        images: [
            { url: 'kitchenaid-mixer-1.jpg', alt: 'KitchenAid stand mixer', isPrimary: true }
        ],
        attributes: [
            { name: 'Capacity', value: '5-quart' },
            { name: 'Power', value: '300W' },
            { name: 'Color', value: 'Empire Red' }
        ]
    },
    {
        name: 'Wilson Pro Staff Tennis Racket',
        description: 'Professional tennis racket used by top players',
        price: 249.99,
        comparePrice: 299.99,
        brand: 'Wilson',
        stock: 35,
        status: 'published',
        images: [
            { url: 'wilson-prostaff-1.jpg', alt: 'Wilson Pro Staff tennis racket', isPrimary: true }
        ],
        attributes: [
            { name: 'Head Size', value: '97 sq in' },
            { name: 'Weight', value: '315g' },
            { name: 'String Pattern', value: '16x19' }
        ]
    },
    {
        name: 'The Great Gatsby Book',
        description: 'Classic American novel by F. Scott Fitzgerald',
        price: 12.99,
        comparePrice: 15.99,
        brand: 'Penguin Classics',
        stock: 200,
        status: 'published',
        images: [
            { url: 'great-gatsby-1.jpg', alt: 'The Great Gatsby book cover', isPrimary: true }
        ],
        attributes: [
            { name: 'Pages', value: '180' },
            { name: 'Language', value: 'English' },
            { name: 'Format', value: 'Paperback' }
        ]
    },
    {
        name: 'LEGO Creator Expert Modular Building',
        description: 'Detailed LEGO set for adult builders',
        price: 179.99,
        comparePrice: 199.99,
        brand: 'LEGO',
        stock: 45,
        status: 'published',
        images: [
            { url: 'lego-modular-1.jpg', alt: 'LEGO modular building set', isPrimary: true },
            { url: 'lego-modular-2.jpg', alt: 'LEGO modular building built', isPrimary: false }
        ],
        attributes: [
            { name: 'Pieces', value: '2568' },
            { name: 'Age', value: '16+' },
            { name: 'Dimensions', value: '25.5 x 25.5 x 15.5 cm' }
        ]
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        // Create categories first
        console.log('Creating categories...');
        const createdCategories = await Category.insertMany(categories);
        console.log(`Created ${createdCategories.length} categories`);

        // Get a vendor user (create one if doesn't exist)
        let vendor = await User.findOne({ role: 'vendor' });
        if (!vendor) {
            vendor = await User.create({
                name: 'Sample Vendor',
                email: 'vendor@example.com',
                password: 'password123',
                role: 'vendor',
                isVerified: true
            });
            console.log('Created sample vendor user');
        }

        // Add category and vendor to products
        const productsWithRefs = products.map((product, index) => ({
            ...product,
            category: createdCategories[index % createdCategories.length]._id,
            vendor: vendor._id,
            slug: product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            sku: `SKU-${String(index + 1).padStart(3, '0')}`,
            ratings: {
                average: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
                count: Math.floor(Math.random() * 100) + 10
            },
            tags: product.name.toLowerCase().split(' ').concat(['popular', 'trending']),
            isActive: true,
            isFeatured: index < 3 // First 3 products are featured
        }));

        // Insert products
        console.log('Creating products...');
        const createdProducts = await Product.insertMany(productsWithRefs);
        console.log(`Created ${createdProducts.length} products`);

        console.log('✅ Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`- Categories: ${createdCategories.length}`);
        console.log(`- Products: ${createdProducts.length}`);
        console.log(`- Vendor: ${vendor.name} (${vendor.email})`);

        console.log('\n🛍️ Sample Products:');
        createdProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
        });

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
    }
};

// Run the seeder
seedProducts();