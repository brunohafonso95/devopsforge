const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'DEVOPSFORGE API',
      version: '1.0.0',
      description: 'API documentation of DEVOPSFORGE',
      contact: {
        email: 'bhafonso@indracompany.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
