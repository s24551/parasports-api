/**
 * @openapi
 * /api/competitions:
 *   get:
 *     summary: Retrieve all competitions
 *     tags: [Competitions]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Upcoming, Ongoing, Completed, Cancelled]
 *         description: Filter competitions by status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Paralympic Games, World Championship, Regional Championship, National Championship]
 *         description: Filter competitions by type
 *     responses:
 *       200:
 *         description: List of competitions
 *         headers:
 *           X-Total-Count:
 *             schema:
 *               type: integer
 *             description: Total number of competitions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Competition'
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
 *     summary: Create a new competition
 *     tags: [Competitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       201:
 *         description: Competition created successfully
 *       400:
 *         description: Invalid input data
 * 
 * /api/competitions/{id}:
 *   get:
 *     summary: Get competition by ID
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Competition details
 *       404:
 *         description: Competition not found
 * 
 * /api/competitions/{id}/participants:
 *   get:
 *     summary: Get competition participants
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of competition participants
 *       404:
 *         description: Competition not found
 */

import { Router } from 'express';
import { competitionController } from '../controllers/competitionController';

const router = Router();

router.get('/', competitionController.getAllCompetitions);
router.get('/:id', competitionController.getCompetitionById);
router.post('/', competitionController.createCompetition);
router.put('/:id', competitionController.updateCompetition);
router.delete('/:id', competitionController.deleteCompetition);
router.get('/:id/participants', competitionController.getCompetitionParticipants);

export { router as competitionsRouter };
