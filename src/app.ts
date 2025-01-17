import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import expressPlayground from 'graphql-playground-middleware-express';
import http from 'http';
import { schema } from './graphql/schema';
import { athletesRouter } from './routes/athletes';
import { paraSportsRouter } from './routes/paraSports';
import { competitionsRouter } from './routes/competitions';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';


const app = express();
const port = process.env.PORT || 3000;

async function startApolloServer() {
    const httpServer = http.createServer(app);
    
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
        csrfPrevention: true,
        cache: 'bounded',
        introspection: true
    });

    await server.start();

    // Middleware
    app.use(express.json());
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:4000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // REST endpoints
    app.use('/api/athletes', athletesRouter);
    app.use('/api/sports', paraSportsRouter);
    app.use('/api/competitions', competitionsRouter);

    // GraphQL endpoint
    app.use('/graphql', 
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token })
        })
    );

    // GraphQL Playground route
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

    console.log(`REST Server is running on port ${port}`);
    console.log(`GraphQL Server ready at http://localhost:${port}/graphql`);
    console.log(`GraphQL Playground available at http://localhost:${port}/playground`);
}

startApolloServer().catch(err => {
    console.error('Error starting server:', err);
});

export default app;