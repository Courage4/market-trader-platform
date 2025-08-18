const request = require('supertest');
const app = require('../src/index');
const Product = require('../src/models/product.model');

describe('Product Routes', () => {
    let authToken;
    let vendorToken;
    let testProduct;

    const testUser = {
        name: 'Test User',
        email: 'user@example.com',
        password: 'Test123!',
        role: 'user'
    };

    const testVendor = {
        name: 'Test Vendor',
        email: 'vendor@example.com',
        password: 'Test123!',
        role: 'vendor'
    };

    beforeEach(async () => {
        // Register and login vendor
        await request(app)
            .post('/api/auth/register')
            .send(testVendor);
        
        const vendorLogin = await request(app)
            .post('/api/auth/login')
            .send({
                email: testVendor.email,
                password: testVendor.password
            });
        
        vendorToken = vendorLogin.body.data.token;

        // Register and login regular user
        await request(app)
            .post('/api/auth/register')
            .send(testUser);
        
        const userLogin = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });
        
        authToken = userLogin.body.data.token;

        // Create a test product
        const productData = {
            name: 'Test Product',
            description: 'Test Description',
            price: 99.99,
            category: 'test-category',
            stock: 10
        };

        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${vendorToken}`)
            .send(productData);

        testProduct = res.body.data;
    });

    describe('GET /api/products', () => {
        it('should get all products', async () => {
            const res = await request(app)
                .get('/api/products');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        it('should search products', async () => {
            const res = await request(app)
                .get('/api/products/search')
                .query({ keyword: 'Test' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('Protected Product Routes', () => {
        it('should create product when vendor', async () => {
            const newProduct = {
                name: 'New Product',
                description: 'New Description',
                price: 149.99,
                category: 'test-category',
                stock: 20
            };

            const res = await request(app)
                .post('/api/products')
                .set('Authorization', `Bearer ${vendorToken}`)
                .send(newProduct);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe(newProduct.name);
        });

        it('should not create product when regular user', async () => {
            const newProduct = {
                name: 'New Product',
                description: 'New Description',
                price: 149.99,
                category: 'test-category',
                stock: 20
            };

            const res = await request(app)
                .post('/api/products')
                .set('Authorization', `Bearer ${authToken}`)
                .send(newProduct);

            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false);
        });

        it('should add review to product', async () => {
            const review = {
                rating: 5,
                comment: 'Great product!'
            };

            const res = await request(app)
                .post(`/api/products/${testProduct._id}/reviews`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(review);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.reviews.length).toBe(1);
            expect(res.body.data.reviews[0].rating).toBe(review.rating);
        });
    });
});
