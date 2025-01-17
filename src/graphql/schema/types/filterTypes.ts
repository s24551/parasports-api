import { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';
import { GraphQLDate } from 'graphql/scalars/dateScalar';

// Typ dla filtrowania stringów
export const StringFilterInput = new GraphQLInputObjectType({
    name: 'StringFilter',
    fields: {
        eq: { type: GraphQLString },      // równy
        contains: { type: GraphQLString }, // zawiera
        notEq: { type: GraphQLString },   // nie równy
        notContains: { type: GraphQLString }, // nie zawiera
        startsWith: { type: GraphQLString }, // zaczyna się na 
        endsWith: { type: GraphQLString }, // kończy się na
    }
});

// Typ dla filtrowania liczb
export const NumberFilterInput = new GraphQLInputObjectType({
    name: 'NumberFilter',
    fields: {
        eq: { type: GraphQLInt },      // równy
        gt: { type: GraphQLInt },      // większy niż
        lt: { type: GraphQLInt },      // mniejszy niż
        gte: { type: GraphQLInt },     // większy lub równy
        lte: { type: GraphQLInt }     // mniejszy lub równy
    }
    
});

export const PaginationInput = new GraphQLInputObjectType({
    name: 'PaginationInput',
    fields: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
    }
});

export const SortInput = new GraphQLInputObjectType({
    name: 'SortInput',
    fields: {
        field: { type: GraphQLString },
        order: { type: GraphQLString } // "ASC" lub "DESC"
    }
});

