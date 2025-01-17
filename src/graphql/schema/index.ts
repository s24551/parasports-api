import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString, GraphQLID }    from 'graphql'; 
import { AthleteType,AthleteFilterInput } from './types/athleteType'; 
import { ParaSportType, ParaSportFilterInput } from'./types/paraSportType'; 
import { CompetitionType, CompetitionFilterInput } from './types/competitionType'; 
import {athletes } from '../../models/Athlete'; import { paraSports } from '../../models/ParaSport'; 
import { competitions } from'../../models/Competition'; 
import { QueryType } from './queries';
import { MutationType } from './mutations';

const RootQuery = new GraphQLObjectType({ name: 'RootQueryType', 
    fields: {
        athlete: {
            type: AthleteType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return athletes.find(athlete => athlete.id === args.id);
            }
        },
        athletes: {
            type: new GraphQLList(AthleteType),
            args: {
                filter: { type: AthleteFilterInput }
            },
            resolve(parent, args) {
                let filteredAthletes = [...athletes];

                if (args.filter) {
                    const { country, disability, classification } = args.filter;

                    if (country) {
                        filteredAthletes = filteredAthletes.filter(
                            athlete => athlete.country.toLowerCase().includes(country.toLowerCase())
                        );
                    }

                    if (disability) {
                        filteredAthletes = filteredAthletes.filter(
                            athlete => athlete.disability.toLowerCase().includes(disability.toLowerCase())
                        );
                    }

                    if (classification) {
                        filteredAthletes = filteredAthletes.filter(
                            athlete => athlete.classification === classification
                        );
                    }
                }

                return filteredAthletes;
            }
        },
        paraSport: {
            type: ParaSportType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return paraSports.find(sport => sport.id === args.id);
            }
        },
        paraSports: {
            type: new GraphQLList(ParaSportType),
            args: {
                filter: { type: ParaSportFilterInput }
            },
            resolve(parent, args) {
                let filteredSports = [...paraSports];


                if (args.filter) {
                    const { category, paralympicStatus, yearFrom, yearTo } = args.filter;


                    if (category) {
                        filteredSports = filteredSports.filter(
                            sport => sport.category.toLowerCase().includes(category.toLowerCase())
                        );
                    }


                    if (paralympicStatus) {
                        filteredSports = filteredSports.filter(
                            sport => sport.paralympicStatus === paralympicStatus
                        );
                    }


                    if (yearFrom) {
                        filteredSports = filteredSports.filter(
                            sport => sport.yearIntroduced >= yearFrom
                        );
                    }


                    if (yearTo) {
                        filteredSports = filteredSports.filter(
                            sport => sport.yearIntroduced <= yearTo
                        );
                    }
                }


                return filteredSports;
            }
        },



        competition: {
            type: CompetitionType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return competitions.find(comp => comp.id === args.id);
            }
        },
        competitions: {
            type: new GraphQLList(CompetitionType),
            args: {
                filter: { type: CompetitionFilterInput }
            },
            resolve(parent, args) {
                let filteredCompetitions = [...competitions];


                if (args.filter) {
                    const { type, status, location, dateFrom, dateTo } = args.filter;


                    if (type) {
                        filteredCompetitions = filteredCompetitions.filter(
                            comp => comp.type === type
                        );
                    }


                    if (status) {
                        filteredCompetitions = filteredCompetitions.filter(
                            comp => comp.status === status
                        );
                    }


                    if (location) {
                        filteredCompetitions = filteredCompetitions.filter(
                            comp => comp.location.toLowerCase().includes(location.toLowerCase())
                        );
                    }


                    if (dateFrom) {
                        filteredCompetitions = filteredCompetitions.filter(
                            comp => comp.startDate >= dateFrom
                        );
                    }


                    if (dateTo) {
                        filteredCompetitions = filteredCompetitions.filter(
                            comp => comp.endDate <= dateTo
                        );
                    }
                }


                return filteredCompetitions;
            }
        }
    }
});


export const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
