import { GraphQLScalarType, Kind } from 'graphql';

export const GraphQLDate = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return null;
    },
    parseValue(value) {
        if (typeof value === 'string') {
            return new Date(value);
        }
        return null;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
