const request = require('supertest');
const app = require('../src/app');
const fs = require('fs/promises');
const path = require('path');

const usersPath = path.join(__dirname, '../src/data/users.json');
const transactionsPath = path.join(__dirname, '../src/data/transactions.json');

// Helper to reset data
const resetData = async () => {
    await fs.writeFile(usersPath, '[]');
    await fs.writeFile(transactionsPath, '[]');
};

beforeEach(async () => {
    await resetData();
});

describe('Finance Tracker API', () => {
    describe('Health Check', () => {
        it('should return 200 and UP status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual('UP');
        });
    });

    describe('User Endpoints', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/users')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.email).toEqual('test@example.com');
        });

        it('should fail with invalid email', async () => {
            const res = await request(app)
                .post('/users')
                .send({
                    username: 'testuser',
                    email: 'invalid-email',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(400); // Validation error
        });
    });

    describe('Transaction Endpoints', () => {
        it('should add a transaction', async () => {
            const res = await request(app)
                .post('/transactions')
                .send({
                    type: 'income',
                    category: 'Salary',
                    amount: 5000,
                    description: 'Monthly Salary'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body.amount).toEqual(5000);
        });

        it('should get summary', async () => {
            // Add income
            await request(app).post('/transactions').send({
                type: 'income', category: 'Salary', amount: 1000
            });
            // Add expense
            await request(app).post('/transactions').send({
                type: 'expense', category: 'Food', amount: 200
            });

            const res = await request(app).get('/transactions/summary');
            expect(res.statusCode).toEqual(200);
            expect(res.body.totalIncome).toEqual(1000);
            expect(res.body.totalExpense).toEqual(200);
            expect(res.body.balance).toEqual(800);
        });
    });
});
