const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Market Trader Platform API',
            version: '1.0.0',
            description: 'API documentation for the Market Trader Platform',
            contact: {
                name: 'API Support',
                email: 'support@markettrader.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [
        './src/routes/*.js',
        './src/models/*.js',
        './src/docs/components.yml'
    ]
};

module.exports = swaggerJsdoc(options);
