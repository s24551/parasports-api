import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import { AthleteType, AthleteFilterInput } from '../types/athleteType';
import { ParaSportType, ParaSportFilterInput } from '../types/paraSportType';
import { CompetitionType, CompetitionFilterInput } from '../types/competitionType';
import { PaginationInput, SortInput } from '../types/filterTypes';
import { athletes } from '../../../models/Athlete';
import { paraSports } from '../../../models/ParaSport';
import { competitions } from '../../../models/Competition';

const applySorting = (data: any[], sort: any) => {
    if (!sort || !sort.field) return data;

    return [...data].sort((a, b) => {
        const valueA = a[sort.field];
        const valueB = b[sort.field];
        
        if (typeof valueA === 'string') {
            return sort.order === 'DESC' 
                ? valueB.localeCompare(valueA)
                : valueA.localeCompare(valueB);
        }
        
        return sort.order === 'DESC' 
            ? valueB - valueA 
            : valueA - valueB;
    });
};

// Funkcja pomocnicza do paginacji
const applyPagination = (data: any[], pagination: any) => {
    if (!pagination) return data;

    const { page = 1, limit = 10 } = pagination;
    const startIndex = (page - 1) * limit;
    return data.slice(startIndex, startIndex + limit);
};


export const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        athletes: {
            type: new GraphQLList(AthleteType),
            args: {
                filter: { type: AthleteFilterInput },
                sort: { type: SortInput },
                pagination: { type: PaginationInput }
            },
            resolve(parent, args) {
                let filteredAthletes = [...athletes];

                // Aplikowanie filtrów
                if (args.filter) {
                   filteredAthletes = filteredAthletes.filter(athlete => {
                        if (args.filter.firstName && !applyStringFilter(athlete.firstName, args.filter.firstName)) return false;
                        if (args.filter.lastName && !applyStringFilter(athlete.lastName, args.filter.lastName)) return false;
                        if (args.filter.country && !applyStringFilter(athlete.country, args.filter.country)) return false;
                        if (args.filter.disability && !applyStringFilter(athlete.disability, args.filter.disability)) return false;
                        if (args.filter.classification && !applyStringFilter(athlete.classification, args.filter.classification)) return false;
                        return true;
                    });

                }

                // Sortowanie
                filteredAthletes = applySorting(filteredAthletes, args.sort);

                // Paginacja
                filteredAthletes = applyPagination(filteredAthletes, args.pagination);

                return filteredAthletes;
            }
        },

        paraSports: {
            type: new GraphQLList(ParaSportType),
            args: {
                filter: { type: ParaSportFilterInput },
                sort: { type: SortInput },
                pagination: { type: PaginationInput }
            },
            resolve(parent, args) {
                let filteredSports = [...paraSports];

                // Aplikowanie filtrów
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

                // Sortowanie
                filteredSports = applySorting(filteredSports, args.sort);

                // Paginacja
                filteredSports = applyPagination(filteredSports, args.pagination);

                return filteredSports;
            }
        },

        competitions: {
            type: new GraphQLList(CompetitionType),
            args: {
                filter: { type: CompetitionFilterInput },
                sort: { type: SortInput },
                pagination: { type: PaginationInput }
            },
            resolve(parent, args) {
                let filteredCompetitions = [...competitions];
    
                // Aplikowanie filtrów
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

                // Sortowanie
                filteredCompetitions = applySorting(filteredCompetitions, args.sort);

                // Paginacja
                filteredCompetitions = applyPagination(filteredCompetitions, args.pagination);


                return filteredCompetitions;
            }
        }
    }
});


// Funkcja pomocnicza do filtrowania stringów
const applyStringFilter = (value: string, filter: any) => {
    if (filter.eq && value !== filter.eq) return false;
    if (filter.notEq && value === filter.notEq) return false;
    if (filter.contains && !value.toLowerCase().includes(filter.contains.toLowerCase())) return false;
    if (filter.notContains && value.toLowerCase().includes(filter.notContains.toLowerCase())) return false;
    return true;
};

export default QueryType;
