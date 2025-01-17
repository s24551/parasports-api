import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInputObjectType } from 'graphql';
import { GraphQLDate } from '../../scalars/dateScalar';


export const MedalistType = new GraphQLObjectType({
    name: 'Medalist',
    fields: {
        gold: { type: GraphQLString },
        silver: { type: GraphQLString },
        bronze: { type: GraphQLString }
    }
});


export const CompetitionType = new GraphQLObjectType({
    name: 'Competition',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sportId: { type: GraphQLString },
        location: { type: GraphQLString },
        startDate: { type: GraphQLDate },
        endDate: { type: GraphQLDate },
        type: { type: GraphQLString },
        status: { type: GraphQLString },
        participantIds: { type: new GraphQLList(GraphQLString) },
        medalists: { type: new GraphQLList(MedalistType) },
        categories: { type: new GraphQLList(GraphQLString) }
    })
});


// Typ inputowy dla filtrowania
export const CompetitionFilterInput = new GraphQLInputObjectType({
    name: 'CompetitionFilter',
    fields: {
        type: { type: GraphQLString },
        status: { type: GraphQLString },
        location: { type: GraphQLString },
        dateFrom: { type: GraphQLDate },
        dateTo: { type: GraphQLDate },
        startDate: { type: GraphQLDate },
        endDate: { type: GraphQLDate },
    }
});


// Typ inputowy dla sortowania
export const CompetitionSortInput = new GraphQLInputObjectType({
    name: 'CompetitionSort',
    fields: {
        field: { type: GraphQLString }, // np. "name", "startDate"
        order: { type: GraphQLString }  // "ASC" lub "DESC"
    }
});
