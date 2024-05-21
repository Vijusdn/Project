// lambdaFunction.test.js

const lambdaFunction = require('./lambdaFunction');

describe('Lambda Function Tests', () => {
    it('should return employee with highest salary', async () => {
        const mockResult = {
            rows: [{
                id: 1,
                name: 'John Doe',
                salary: 100000,
                designation: 'Engineer'
            }] 
        };
        const mockClient = new lambdaFunction.Client();
        mockClient.query.mockResolvedValueOnce(mockResult);

        const response = await lambdaFunction.handler();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(JSON.stringify(mockResult.rows[0]));
    });

    it('should return 404 if no employees found', async () => {
        const mockResult = { rows: [] };
        const mockClient = new lambdaFunction.Client();
        mockClient.query.mockResolvedValueOnce(mockResult);

        const response = await lambdaFunction.handler();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(JSON.stringify({ message: "No employees found" }));
    });

    it('should return 500 if an error occurs', async () => {
        const mockClient = new lambdaFunction.Client();
        mockClient.query.mockRejectedValueOnce(new Error('Internal Server Error'));

        const response = await lambdaFunction.handler();
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(JSON.stringify({ message: "Internal Server Error" }));
    });
});
