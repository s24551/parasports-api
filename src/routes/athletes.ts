/**
 * @openapi
 * /api/athletes:
 *   get:
 *     summary: Retrieve all athletes
 *     tags: [Athletes]
 *     responses:
 *       200:
 *         description: List of athletes
 *         headers:
 *           X-Total-Count:
 *             schema:
 *               type: integer
 *             description: Total number of athletes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Athlete'
 *                 _links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: object
 *                       properties:
 *                         href:
 *                           type: string
 *       500:
 *         description: Server error
 *   
 *   post:
 *     summary: Create a new athlete
 *     tags: [Athletes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Athlete'
 *     responses:
 *       201:
 *         description: Athlete created successfully
 *       400:
 *         description: Invalid input data
 */

import { Router } from 'express';
import { athleteController } from '../controllers/athleteController';

const router = Router();

router.get('/', athleteController.getAllAthletes);
router.get('/:id', athleteController.getAthleteById);
router.post('/', athleteController.createAthlete);
router.put('/:id', athleteController.updateAthlete);
router.delete('/:id', athleteController.deleteAthlete);
router.get('/:id/sports', athleteController.getAthletesSports);

export { router as athletesRouter };