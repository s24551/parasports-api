/**
 * @openapi
 * components:
 *   schemas:
 *     ParaSport:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - paralympicStatus
 *         - yearIntroduced
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         name:
 *           type: string
 *           example: "Wheelchair Basketball"
 *         description:
 *           type: string
 *           example: "A basketball game played by people in wheelchairs"
 *         category:
 *           type: string
 *           example: "Summer Paralympic Sports"
 *         classification:
 *           type: array
 *           items:
 *             type: string
 *           example: ["1.0", "2.0", "3.0", "4.0", "4.5"]
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Sports wheelchair", "Basketball"]
 *         paralympicStatus:
 *           type: string
 *           enum: [Current, Former, Future, Demonstration]
 *           example: "Current"
 *         yearIntroduced:
 *           type: integer
 *           example: 1960
 */

export interface ParaSport {
    id: string;
    name: string;
    description: string;
    category: string; // np. "Summer Paralympic Sports", "Winter Paralympic Sports"
    classification: string[]; // różne klasy niepełnosprawności dopuszczone w danym sporcie
    equipment: string[]; // wymagany sprzęt
    paralympicStatus: "Current" | "Former" | "Future" | "Demonstration";
    yearIntroduced: number; // rok wprowadzenia do programu paralympijskiego
}

// Dane testowe
export const paraSports: ParaSport[] = [
    {
        id: "1",
        name: "Wheelchair Basketball",
        description: "A basketball game played by people in wheelchairs",
        category: "Summer Paralympic Sports",
        classification: ["1.0", "2.0", "3.0", "4.0", "4.5"],
        equipment: ["Sports wheelchair", "Basketball"],
        paralympicStatus: "Current",
        yearIntroduced: 1969
    },
    {
        id: "2",
        name: "Para Swimming",
        description: "Swimming adapted for athletes with physical disabilities",
        category: "Summer Paralympic Sports",
        classification: ["S1-S10", "SB1-SB9", "SM1-SM10"],
        equipment: ["Swimming aids"],
        paralympicStatus: "Future",
        yearIntroduced: 1960
    },
    {
        id: "3",
        name: "Para Athletics",
        description: "Track and field sports adapted for athletes with physical disabilities, including running, jumping and throwing events",
        category: "Summer Paralympic Sports",
        classification: ["T11", "T12", "T13", "T44", "T45", "T46", "F11", "F12", "F13"],
        equipment: ["Racing wheelchair", "Prosthetic limbs", "Throwing frame", "Guide runners"],
        paralympicStatus: "Current",
        yearIntroduced: 1960
    },
    {
        id: "4", 
        name: "Para Swimming",
        description: "Swimming events adapted for athletes with physical, visual and intellectual impairments",
        category: "Summer Paralympic Sports",
        classification: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13"],
        equipment: ["Starting platforms", "Swimming caps", "Lane ropes", "Tapping devices"],
        paralympicStatus: "Current",
        yearIntroduced: 1960
    },
    {
        id: "5",
        name: "Wheelchair Basketball",
        description: "Basketball adapted for athletes who require a wheelchair for mobility",
        category: "Summer Paralympic Sports",
        classification: ["1.0", "2.0", "3.0", "4.0", "4.5"],
        equipment: ["Sports wheelchair", "Basketball", "Court"],
        paralympicStatus: "Current",
        yearIntroduced: 1960
    },
    {
        id: "6",
        name: "Para Alpine Skiing",
        description: "Downhill skiing events adapted for athletes with physical and visual impairments",
        category: "Winter Paralympic Sports",
        classification: ["LW1", "LW2", "LW3", "LW4", "B1", "B2", "B3"],
        equipment: ["Sit-ski", "Outriggers", "Helmet", "Guide", "Adaptive skis"],
        paralympicStatus: "Current",
        yearIntroduced: 1976
    },
    {
        id: "7",
        name: "Sitting Volleyball",
        description: "Volleyball adapted for athletes with physical impairments, played from a sitting position",
        category: "Summer Paralympic Sports",
        classification: ["VS1", "VS2"],
        equipment: ["Volleyball", "Court", "Lower net"],
        paralympicStatus: "Current",
        yearIntroduced: 1980
    },
    {
        id: "8",
        name: "Para Ice Hockey",
        description: "Ice hockey adapted for athletes with lower body impairments, formerly known as sledge hockey",
        category: "Winter Paralympic Sports",
        classification: ["Upper body impairment"],
        equipment: ["Ice sledge", "Hockey sticks", "Puck", "Protective gear"],
        paralympicStatus: "Current",
        yearIntroduced: 1994
    },
    {
        id: "9",
        name: "Wheelchair Tennis",
        description: "Tennis adapted for athletes using wheelchairs, with two-bounce rule",
        category: "Summer Paralympic Sports",
        classification: ["Open", "Quad"],
        equipment: ["Sports wheelchair", "Tennis racket", "Tennis balls", "Court"],
        paralympicStatus: "Current",
        yearIntroduced: 1992
    },
    {
        id: "10",
        name: "Boccia",
        description: "Precision ball sport similar to bocce, designed for athletes with severe physical disabilities",
        category: "Summer Paralympic Sports",
        classification: ["BC1", "BC2", "BC3", "BC4"],
        equipment: ["Boccia balls", "Ramp", "Head pointer", "Court"],
        paralympicStatus: "Current",
        yearIntroduced: 1984
    },
    {
        id: "11",
        name: "Para Cross-Country Skiing",
        description: "Nordic skiing events adapted for athletes with physical and visual impairments",
        category: "Winter Paralympic Sports",
        classification: ["LW2", "LW3", "LW4", "B1", "B2", "B3"],
        equipment: ["Sit-ski", "Poles", "Guide", "Adaptive skis"],
        paralympicStatus: "Current",
        yearIntroduced: 1976
    },
    {
        id: "12",
        name: "Goalball",
        description: "Team sport designed for athletes with visual impairments, using a ball with bells",
        category: "Summer Paralympic Sports",
        classification: ["B1", "B2", "B3"],
        equipment: ["Goalball", "Eye shades", "Court markings", "Goals"],
        paralympicStatus: "Current",
        yearIntroduced: 1976
    }
];