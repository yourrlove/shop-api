const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const admin = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'YOLO Website API for Admin',
          description: "This is a REST api for YOLO website for Admin. You can find out more about YOLO at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).",
          version: '1.0.0',
          contact: {
            email: 'nanhvt2708@gmail.com'
          },
          termsOfService: 'http://swagger.io/terms/'
        },
        servers: [
          {
            url: 'http://localhost:3000/v1/admin'
          }
        ]
    },
    apis: [path.join(__dirname, 'admin', '**', '*.yaml')], // files containing annotations as above
};
 
const web = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'YOLO Website API',
          description: "This is a REST api for YOLO website. You can find out more about YOLO at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).",
          version: '1.0.0',
          contact: {
            email: 'nanhvt2708@gmail.com'
          },
          termsOfService: 'http://swagger.io/terms/'
        },
        servers: [
          {
            url: 'http://localhost:3000/v1/web'
          }
        ]
    },
    apis: [path.join(__dirname, 'web', '**', '*.yaml')], // files containing annotations as above
};
 

module.exports = {
    adminSpecification: swaggerJsdoc(admin),
    webSpecification: swaggerJsdoc(web),
};