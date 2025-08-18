const request = require('supertest');
const app = require('../src/index');
const User = require('../src/models/user.model');

describe('Auth Routes', () => {
    const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!',
        role: 'user'
    };

    let authToken;

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.user.email).toBe(testUser.email);
            expect(res.body.data.token).toBeDefined();
        });

        it('should not register user with existing email', async () => {
            await request(app)
                .post('/api/auth/register')
                .send(testUser);

            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/auth/register')
                .send(testUser);
        });

        it('should login user with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.token).toBeDefined();
            authToken = res.body.data.token;
        });

        it('should not login with invalid password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });

    describe('Protected Routes', () => {
        beforeEach(async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);
            authToken = res.body.data.token;
        });

        it('should access protected route with valid token', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.email).toBe(testUser.email);
        });

        it('should not access protected route without token', async () => {
            const res = await request(app)
                .get('/api/auth/me');

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });
});
