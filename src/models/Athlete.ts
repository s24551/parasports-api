/**
 * @openapi
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         competitionId:
 *           type: string
 *           example: "1"
 *         place:
 *           type: number
 *           example: 1
 *         date:
 *           type: string
 *           format: date
 *           example: "2023-01-01"
 *     
 *     Athlete:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - country
 *         - disability
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         firstName:
 *           type: string
 *           example: "Jan"
 *         lastName:
 *           type: string
 *           example: "Kowalski"
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *         country:
 *           type: string
 *           example: "Poland"
 *         disability:
 *           type: string
 *           example: "Visual impairment"
 *         sportsIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["1", "2"]
 *         achievements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Achievement'
 *         classification:
 *           type: string
 *           example: "T11"
 */

export interface Athlete {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    country: string;
    disability: string;
    sportsIds: string[];
    achievements: Achievement[];
    classification: string;
}

export interface Achievement {
    id: string;
    competitionId: string;
    place: number;
    date: Date;
}

// Dane testowe
export const athletes: Athlete[] = [
    {
        id: "1",
        firstName: "Jan",
        lastName: "Kowalski",
        dateOfBirth: new Date("1990-01-01"),
        country: "Poland",
        disability: "Amputation",
        sportsIds: ["1", "2"],
        achievements: [
            {
                id: "1",
                competitionId: "1",
                place: 1,
                date: new Date("2023-01-01")
            }
        ],
        classification: "T44"
    },
    {
        id: "2",
        firstName: "Adam",
        lastName: "Nowak",
        dateOfBirth: new Date("1995-03-15"),
        country: "Poland",
        disability: "Beznogi",
        sportsIds: ["1", "3"],
        achievements: [
            {
                id: "2",
                competitionId: "2",
                place: 2,
                date: new Date("2023-06-15")
            },
            {
                id: "3",
                competitionId: "1",
                place: 3,
                date: new Date("2023-01-01")
            }
        ],
        classification: "T11"
    },
    {
        id: "3",
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: new Date("1992-05-15"),
        country: "USA",
        disability: "Visual Impairment",
        sportsIds: ["1", "10"], // Para Athletics and Goalball
        achievements: [
            {
                id: "1",
                competitionId: "1",
                place: 1,
                date: new Date("2024-07-22")
            }
        ],
        classification: "T11"
    },
    {
        id: "4",
        firstName: "Emma",
        lastName: "Johnson",
        dateOfBirth: new Date("1995-08-23"),
        country: "Great Britain",
        disability: "Spinal Cord Injury",
        sportsIds: ["2"], // Para Swimming
        achievements: [
            {
                id: "2",
                competitionId: "2",
                place: 1,
                date: new Date("2024-03-05")
            }
        ],
        classification: "S6"
    },
    {
        id: "5",
        firstName: "Hans",
        lastName: "Weber",
        dateOfBirth: new Date("1998-03-12"),
        country: "Germany",
        disability: "Lower Limb Amputation",
        sportsIds: ["3", "7"], // Wheelchair Basketball and Wheelchair Tennis
        achievements: [
            {
                id: "3",
                competitionId: "3",
                place: 2,
                date: new Date("2024-08-18")
            }
        ],
        classification: "4.0"
    },
    {
        id: "6",
        firstName: "Marie",
        lastName: "Dubois",
        dateOfBirth: new Date("1994-11-30"),
        country: "France",
        disability: "Cerebral Palsy",
        sportsIds: ["8"], // Boccia
        achievements: [
            {
                id: "4",
                competitionId: "8",
                place: 1,
                date: new Date("2024-10-22")
            }
        ],
        classification: "BC1"
    },
    {
        id: "7",
        firstName: "Alessandro",
        lastName: "Rossi",
        dateOfBirth: new Date("1991-07-19"),
        country: "Italy",
        disability: "Visual Impairment",
        sportsIds: ["4", "9"], // Para Alpine Skiing and Para Cross-Country Skiing
        achievements: [
            {
                id: "5",
                competitionId: "4",
                place: 1,
                date: new Date("2024-03-15")
            }
        ],
        classification: "B2"
    },
    {
        id: "8",
        firstName: "Yuki",
        lastName: "Tanaka",
        dateOfBirth: new Date("1996-04-25"),
        country: "Japan",
        disability: "Limb Deficiency",
        sportsIds: ["5"], // Sitting Volleyball
        achievements: [
            {
                id: "6",
                competitionId: "5",
                place: 2,
                date: new Date("2024-09-28")
            }
        ],
        classification: "VS1"
    },
    {
        id: "9",
        firstName: "Sarah",
        lastName: "Anderson",
        dateOfBirth: new Date("1993-09-08"),
        country: "Canada",
        disability: "Spinal Cord Injury",
        sportsIds: ["6"], // Para Ice Hockey
        achievements: [
            {
                id: "7",
                competitionId: "6",
                place: 1,
                date: new Date("2024-04-20")
            }
        ],
        classification: "Upper body impairment"
    },
    {
        id: "10",
        firstName: "Lucas",
        lastName: "Santos",
        dateOfBirth: new Date("1997-02-14"),
        country: "Brazil",
        disability: "Muscular Dystrophy",
        sportsIds: ["8"], // Boccia
        achievements: [
            {
                id: "8",
                competitionId: "8",
                place: 2,
                date: new Date("2024-10-22")
            }
        ],
        classification: "BC3"
    },
    {
        id: "11",
        firstName: "Min-ji",
        lastName: "Kim",
        dateOfBirth: new Date("1999-12-03"),
        country: "South Korea",
        disability: "Visual Impairment",
        sportsIds: ["10"], // Goalball
        achievements: [
            {
                id: "9",
                competitionId: "10",
                place: 1,
                date: new Date("2024-11-07")
            }
        ],
        classification: "B1"
    },
    {
        id: "12",
        firstName: "Oscar",
        lastName: "Garcia",
        dateOfBirth: new Date("1990-06-21"),
        country: "Spain",
        disability: "Lower Limb Amputation",
        sportsIds: ["1", "7"], // Para Athletics and Wheelchair Tennis
        achievements: [
            {
                id: "10",
                competitionId: "1",
                place: 3,
                date: new Date("2024-07-22")
            },
            {
                id: "11",
                competitionId: "7",
                place: 1,
                date: new Date("2024-09-08")
            }
        ],
        classification: "T44"
    }
];