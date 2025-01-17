/**
 * @openapi
 * /api/sports:
 *   get:
 *     summary: Retrieve all paralympic sports
 *     tags: [ParaSports]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter sports by category
 *     responses:
 *       200:
 *         description: List of paralympic sports
 *         headers:
 *           X-Total-Count:
 *             schema:
 *               type: integer
 *             description: Total number of sports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ParaSport'
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
 *     summary: Create a new paralympic sport
 *     tags: [ParaSports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParaSport'
 *     responses:
 *       201:
 *         description: Sport created successfully
 *       400:
 *         description: Invalid input data
 * 
 * /api/sports/{id}:
 *   get:
 *     summary: Get sport by ID
 *     tags: [ParaSports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sport details
 *       404:
 *         description: Sport not found
 */

import { Router } from 'express';
import { paraSportController } from '../controllers/paraSportController';

const router = Router();

router.get('/', paraSportController.getAllSports);
router.get('/:id', paraSportController.getSportById);
router.post('/', paraSportController.createSport);
router.put('/:id', paraSportController.updateSport);
router.delete('/:id', paraSportController.deleteSport);

export { router as paraSportsRouter };