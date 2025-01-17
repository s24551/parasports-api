import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql';
import { AthleteType } from '../types/athleteType';
import { ParaSportType } from '../types/paraSportType';
import { CompetitionType } from '../types/competitionType';
import { athletes } from '../../../models/Athlete';
import { paraSports } from '../../../models/ParaSport';
import { competitions } from '../../../models/Competition';
import { GraphQLDate } from '../../scalars/dateScalar';



export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Athletes mutations
        createAthlete: {
            type: AthleteType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                dateOfBirth: { type: new GraphQLNonNull(GraphQLDate) },
                country: { type: new GraphQLNonNull(GraphQLString) },
                disability: { type: new GraphQLNonNull(GraphQLString) },
                classification: { type: new GraphQLNonNull(GraphQLString) },
                sportsIds: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parent, args) {
                const newAthlete = {
                    id: (athletes.length + 1).toString(),
                    ...args,
                    achievements: [],
                    sportsIds: args.sportsIds || []
                };
                athletes.push(newAthlete);
                return newAthlete;
            }
        },

        // ParaSports mutations
        createParaSport: {
            type: ParaSportType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
                classification: { type: new GraphQLList(GraphQLString) },
                equipment: { type: new GraphQLList(GraphQLString) },
                paralympicStatus: { type: new GraphQLNonNull(GraphQLString) },
                yearIntroduced: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const newSport = {
                    id: (paraSports.length + 1).toString(),
                    ...args
                };
                paraSports.push(newSport);
                return newSport;
            }
        },

        // Competitions mutations
        createCompetition: {
            type: CompetitionType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                sportId: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                startDate: { type: new GraphQLNonNull(GraphQLDate) },
                endDate: { type: new GraphQLNonNull(GraphQLDate) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                categories: { type: new GraphQLList(GraphQLString) },
                participantIds: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parent, args) {
                const newCompetition = {
                    id: (competitions.length + 1).toString(),
                    ...args,
                    participantIds: args.participantIds || [],
                    medalists: []
                };
                competitions.push(newCompetition);
                return newCompetition;
            }
        },

        // UPDATE mutations
        updateAthlete: {
            type: AthleteType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                country: { type: GraphQLString },
                disability: { type: GraphQLString },
                classification: { type: GraphQLString }
            },
            resolve(parent, args) {
                const index = athletes.findIndex(a => a.id === args.id);
                if (index === -1) throw new Error('Athlete not found');
                
                athletes[index] = {
                    ...athletes[index],
                    ...args
                };
                return athletes[index];
            }
        },

        // DELETE mutations
        deleteAthlete: {
            type: AthleteType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const index = athletes.findIndex(a => a.id === args.id);
                if (index === -1) throw new Error('Athlete not found');
                
                const deletedAthlete = athletes[index];
                athletes.splice(index, 1);
                return deletedAthlete;
            }
        }
    }
});



export default MutationType;
