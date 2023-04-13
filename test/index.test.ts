import server from '../src/server'
import supertest from 'supertest';

test('GET /', async () => {
    const response = await supertest(server).get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Express + TypeScript Server');
})

afterAll(done => {
    server.close();
    done()
})
