import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLInputObjectType } from 'graphql';


export const ParaSportType = new GraphQLObjectType({
    name: 'ParaSport',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        classification: { type: new GraphQLList(GraphQLString) },
        equipment: { type: new GraphQLList(GraphQLString) },
        paralympicStatus: { type: GraphQLString },
        yearIntroduced: { type: GraphQLInt }
    })
});


// Typ inputowy dla filtrowania
export const ParaSportFilterInput = new GraphQLInputObjectType({
    name: 'ParaSportFilter',
    fields: {
        category: { type: GraphQLString },
        paralympicStatus: { type: GraphQLString },
        yearFrom: { type: GraphQLInt },
        yearTo: { type: GraphQLInt }
    }
});


// Typ inputowy dla sortowania
export const ParaSportSortInput = new GraphQLInputObjectType({
    name: 'ParaSportSort',
    fields: {
        field: { type: GraphQLString }, // np. "name", "yearIntroduced"
        order: { type: GraphQLString }  // "ASC" lub "DESC"
    }
});
