// lambdaFunction.js

const { Client } = require('pg');

exports.handler = async (event) => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    try {
        await client.connect();

        // Query to get employee with the highest salary
        const query = 'SELECT * FROM employee ORDER BY salary DESC LIMIT 1';
        const result = await client.query(query);

        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "No employees found" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.rows[0])
        };
    } catch (err) {
        console.error('Error executing query', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    } finally {
        await client.end();
    }
};
