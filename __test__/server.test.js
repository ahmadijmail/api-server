'use strict';
const { app } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(app);
// console.log('************************************');
// console.log(mockRequest);
// console.log('************************************');

const { db } = require('../src/models/index');

// before any of the test create a connection
beforeAll(async () => {
    await db.sync();
});

describe('Web server', () => {
    // Check if 404 is handled 

    test('Should respond with 404 status on an invalid route', async () => {
        const response = await mockRequest.get('/fool');
        expect(response.status).toBe(404);
    });

    // test if can create a food
    test('can add a food', async () => {
        const response = await mockRequest.post('/addfood').send({
            namOfFood: 'ahmad',
            category: 'ijmail'
        });
        expect(response.status).toBe(201);
    });

    // test if can read
    test('can get all food', async () => {
        const response = await mockRequest.get('/food');
        expect(response.status).toBe(200);

    });
// test read one 
    test('can get one food', async () => {
        const response = await mockRequest.get('/food/2');
        expect(response.status).toBe(200);

    });
 
 //test update a recrod   
    test('can update a record', async () => {
        const response = await mockRequest.put('/food/6');
        expect(response.status).toBe(201);
    });
    // test if can delete a food
    test('can delete a record', async () => {
        const response = await mockRequest.delete('/food/6');
        expect(response.status).toBe(204);
    });
});

// after all the tests are done
afterAll(async () => {
    await db.drop();
});