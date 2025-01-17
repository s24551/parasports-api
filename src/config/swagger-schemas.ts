export const swaggerSchemas = {
    openapi: "3.0.0",
    components: {
        schemas: {
            Achievement: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "1"
                    },
                    competitionId: {
                        type: "string",
                        example: "1"
                    },
                    place: {
                        type: "number",
                        example: 1
                    },
                    date: {
                        type: "string",
                        format: "date",
                        example: "2023-01-01"
                    }
                }
            },
            Athlete: {
                type: "object",
                required: ["firstName", "lastName", "country", "disability"],
                properties: {
                    id: {
                        type: "string",
                        example: "1"
                    },
                    firstName: {
                        type: "string",
                        example: "Jan"
                    },
                    lastName: {
                        type: "string",
                        example: "Kowalski"
                    },
                    dateOfBirth: {
                        type: "string",
                        format: "date",
                        example: "1990-01-01"
                    },
                    country: {
                        type: "string",
                        example: "Poland"
                    },
                    disability: {
                        type: "string",
                        example: "Visual impairment"
                    },
                    sportsIds: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["1", "2"]
                    },
                    achievements: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Achievement"
                        }
                    },
                    classification: {
                        type: "string",
                        example: "T11"
                    }
                }
            },
            ParaSport: {
                type: "object",
                required: ["name", "description", "category", "paralympicStatus", "yearIntroduced"],
                properties: {
                    id: {
                        type: "string",
                        example: "1"
                    },
                    name: {
                        type: "string",
                        example: "Wheelchair Basketball"
                    },
                    description: {
                        type: "string",
                        example: "A basketball game played by people in wheelchairs"
                    },
                    category: {
                        type: "string",
                        example: "Summer Paralympic Sports"
                    },
                    classification: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["1.0", "2.0", "3.0", "4.0", "4.5"]
                    },
                    equipment: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["Sports wheelchair", "Basketball"]
                    },
                    paralympicStatus: {
                        type: "string",
                        enum: ["Current", "Former", "Future", "Demonstration"],
                        example: "Current"
                    },
                    yearIntroduced: {
                        type: "integer",
                        example: 1960
                    }
                }
            },
            Competition: {
                type: "object",
                required: ["name", "sportId", "location", "startDate", "endDate", "type", "status"],
                properties: {
                    id: {
                        type: "string",
                        example: "1"
                    },
                    name: {
                        type: "string",
                        example: "2024 Paralympic Games - Wheelchair Basketball"
                    },
                    sportId: {
                        type: "string",
                        example: "1"
                    },
                    location: {
                        type: "string",
                        example: "Paris, France"
                    },
                    startDate: {
                        type: "string",
                        format: "date",
                        example: "2024-08-28"
                    },
                    endDate: {
                        type: "string",
                        format: "date",
                        example: "2024-09-08"
                    },
                    type: {
                        type: "string",
                        enum: ["Paralympic Games", "World Championship", "Regional Championship", "National Championship"],
                        example: "Paralympic Games"
                    },
                    status: {
                        type: "string",
                        enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
                        example: "Upcoming"
                    },
                    participantIds: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["1", "2", "3"]
                    },
                    categories: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: ["Men's Tournament", "Women's Tournament"]
                    }
                }
            }
        }
    }
};
