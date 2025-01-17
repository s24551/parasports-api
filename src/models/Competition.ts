/**
 * @openapi
 * components:
 *   schemas:
 *     Medalist:
 *       type: object
 *       properties:
 *         gold:
 *           type: string
 *           example: "1"
 *           description: ID of gold medalist
 *         silver:
 *           type: string
 *           example: "2"
 *           description: ID of silver medalist
 *         bronze:
 *           type: string
 *           example: "3"
 *           description: ID of bronze medalist
 *     
 *     Competition:
 *       type: object
 *       required:
 *         - name
 *         - sportId
 *         - location
 *         - startDate
 *         - endDate
 *         - type
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         name:
 *           type: string
 *           example: "2024 Paralympic Games - Wheelchair Basketball"
 *         sportId:
 *           type: string
 *           example: "1"
 *         location:
 *           type: string
 *           example: "Paris, France"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2024-08-28"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2024-09-08"
 *         type:
 *           type: string
 *           enum: [Paralympic Games, World Championship, Regional Championship, National Championship]
 *           example: "Paralympic Games"
 *         status:
 *           type: string
 *           enum: [Upcoming, Ongoing, Completed, Cancelled]
 *           example: "Upcoming"
 *         participantIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["1", "2", "3"]
 *         medalists:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Medalist'
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Men's Tournament", "Women's Tournament"]
 */

export interface Competition {
    id: string;
    name: string;
    sportId: string;
    location: string;
    startDate: Date;
    endDate: Date;
    type: "Paralympic Games" | "World Championship" | "Regional Championship" | "National Championship";
    status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
    participantIds: string[]; // odniesienie do Athletes
    medalists?: {
        gold?: string;   // athlete ID
        silver?: string; // athlete ID
        bronze?: string; // athlete ID
    }[];
    categories: string[]; // kategorie klasyfikacji
}

// Dane testowe
export const competitions: Competition[] = [
    {
        id: "1",
        name: "2024 Paralympic Games - Wheelchair Basketball",
        sportId: "1",
        location: "Paris, France",
        startDate: new Date("2024-08-28"),
        endDate: new Date("2024-09-08"),
        type: "Paralympic Games",
        status: "Upcoming",
        participantIds: ["1"],
        categories: ["Men's Tournament", "Women's Tournament"],
        medalists: []
    },
    {
        id: "2",
        name: "2024 World Para Athletics Championships",
        sportId: "1", // Para Athletics
        location: "Paris, France",
        startDate: new Date("2024-07-15"),
        endDate: new Date("2024-07-22"),
        type: "World Championship",
        status: "Upcoming",
        participantIds: ["1", "2", "3", "4"],
        medalists: [
            {
                gold: "1",
                silver: "2",
                bronze: "3"
            }
        ],
        categories: ["T11", "T12", "T44", "F11", "F12"]
    },
    {
        id: "3",
        name: "2024 Paralympic Swimming Series",
        sportId: "2", // Para Swimming
        location: "Melbourne, Australia",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-05"),
        type: "World Championship",
        status: "Completed",
        participantIds: ["5", "6", "7", "8"],
        medalists: [
            {
                gold: "5",
                silver: "6",
                bronze: "7"
            }
        ],
        categories: ["S6", "S7", "S8", "S9"]
    },
    {
        id: "4",
        name: "European Wheelchair Basketball Championship 2024",
        sportId: "3", // Wheelchair Basketball
        location: "Berlin, Germany",
        startDate: new Date("2024-08-10"),
        endDate: new Date("2024-08-18"),
        type: "Regional Championship",
        status: "Upcoming",
        participantIds: ["9", "10", "11", "12"],
        medalists: [],
        categories: ["1.0", "2.0", "3.0", "4.0"]
    },
    {
        id: "5",
        name: "2024 Winter Paralympics - Alpine Skiing",
        sportId: "4", // Para Alpine Skiing
        location: "Milan-Cortina, Italy",
        startDate: new Date("2024-03-10"),
        endDate: new Date("2024-03-15"),
        type: "Paralympic Games",
        status: "Completed",
        participantIds: ["13", "14", "15"],
        medalists: [
            {
                gold: "13",
                silver: "14",
                bronze: "15"
            }
        ],
        categories: ["LW1", "LW2", "B1", "B2"]
    },
    {
        id: "6",
        name: "World Sitting Volleyball Championships",
        sportId: "5", // Sitting Volleyball
        location: "Tokyo, Japan",
        startDate: new Date("2024-09-20"),
        endDate: new Date("2024-09-28"),
        type: "World Championship",
        status: "Upcoming",
        participantIds: ["16", "17", "18", "19"],
        medalists: [],
        categories: ["VS1", "VS2"]
    },
    {
        id: "7",
        name: "2024 Para Ice Hockey World Championships",
        sportId: "6", // Para Ice Hockey
        location: "Ottawa, Canada",
        startDate: new Date("2025-04-12"),
        endDate: new Date("2024-04-20"),
        type: "World Championship",
        status: "Completed",
        participantIds: ["20", "21", "22"],
        medalists: [
            {
                gold: "20",
                silver: "21",
                bronze: "22"
            }
        ],
        categories: ["Upper body impairment"]
    },
    {
        id: "8",
        name: "US Open Wheelchair Tennis Championships",
        sportId: "7", // Wheelchair Tennis
        location: "New York, USA",
        startDate: new Date("2024-09-05"),
        endDate: new Date("2024-09-08"),
        type: "National Championship",
        status: "Upcoming",
        participantIds: ["23", "24", "25"],
        medalists: [],
        categories: ["Open", "Quad"]
    },
    {
        id: "9",
        name: "Boccia World Championships 2024",
        sportId: "8", // Boccia
        location: "São Paulo, Brazil",
        startDate: new Date("2024-10-15"),
        endDate: new Date("2024-10-22"),
        type: "World Championship",
        status: "Upcoming",
        participantIds: ["26", "27", "28", "29"],
        medalists: [],
        categories: ["BC1", "BC2", "BC3", "BC4"]
    },
    {
        id: "10",
        name: "2024 Winter Paralympics - Cross-Country Skiing",
        sportId: "9", // Para Cross-Country Skiing
        location: "Milan-Cortina, Italy",
        startDate: new Date("2024-03-12"),
        endDate: new Date("2024-03-18"),
        type: "Paralympic Games",
        status: "Completed",
        participantIds: ["30", "31", "32"],
        medalists: [
            {
                gold: "30",
                silver: "31",
                bronze: "32"
            }
        ],
        categories: ["LW2", "LW3", "B1", "B2"]
    },
    {
        id: "11",
        name: "Asian Goalball Championships",
        sportId: "10", // Goalball
        location: "Seoul, South Korea",
        startDate: new Date("2024-11-01"),
        endDate: new Date("2024-11-07"),
        type: "Regional Championship",
        status: "Upcoming",
        participantIds: ["33", "34", "35", "36"],
        medalists: [],
        categories: ["B1", "B2", "B3"]
    }

];
