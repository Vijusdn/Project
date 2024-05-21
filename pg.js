// __mocks__/pg.js

const mockClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn()
};

const Client = jest.fn(() => mockClient);

module.exports = { Client };
