import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInputObjectType } from 'graphql';
import { GraphQLDate } from '../../scalars/dateScalar';
import { StringFilterInput } from './filterTypes';

export const AthleteTrophyType = new GraphQLObjectType({
    name: 'AthleteTrophy',
    fields: {
        id: { type: GraphQLID },
        competitionId: { type: GraphQLString },
        place: { type: GraphQLString },
        date: { type: GraphQLDate }
    }
});

export const AthleteType = new GraphQLObjectType({
    name: 'Athlete',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dateOfBirth: { type: GraphQLDate },
        country: { type: GraphQLString },
        disability: { type: GraphQLString },
        sportsIds: { type: new GraphQLList(GraphQLString) },
        achievements: { type: new GraphQLList(AthleteTrophyType) },
        classification: { type: GraphQLString }
    })
});

export const AthleteFilterInput = new GraphQLInputObjectType({
    name: 'AthleteFilter',
    fields: {
        firstName: { type: StringFilterInput },
        lastName: { type: StringFilterInput },
        country: { type: StringFilterInput },
        disability: { type: StringFilterInput },
        classification: { type: StringFilterInput }
    }
});
