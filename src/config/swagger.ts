import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerSchemas } from './swagger-schemas';


const options = {
    definition: {
        ...swaggerSchemas,
        info: {
            title: 'ParaSports API',
            version: '1.0.0',
            description: 'REST API for Paralympic Sports',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};




export const specs = swaggerJsdoc(options);
