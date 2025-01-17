import { Request, Response } from 'express';
import { athletes, Athlete } from '../models/Athlete';

export const athleteController = {
    getAllAthletes: async (req: Request, res: Response): Promise<void> => {
        try {
            // htttp headers
            res.header('X-Total-Count', athletes.length.toString());
            res.header('X-Response-Time', '100ms');
            res.header('Cache-Control', 'max-age=3600');
            res.header('Access-Control-Expose-Headers', 'X-Total-Count');
            res.header('ETag', 'W/"123-abc"');

            //  HATEOAS
            res.status(200).json({
                data: athletes,
                _links: {
                    self: { href: '/api/athletes' },
                    sports: { href: '/api/sports' },
                    competitions: { href: '/api/competitions' },
                    create: { href: '/api/athletes', method: 'POST' },
                    docs: { href: '/api-docs#/Athletes' }
                },
                _meta: {
                    totalCount: athletes.length,
                    page: parseInt(req.query.page as string) || 1
                }
            });
        } catch (error) {
            res.header('X-Error-Type', 'Internal');
            res.status(500).json({ 
                error: 'Internal server error',
                _links: {
                    self: { href: '/api/athletes' }
                }
            });
        }
    },


    getAthleteById: async (req: Request, res: Response): Promise<void> => {
        try {
            const athlete = athletes.find(a => a.id === req.params.id);
            
            if (!athlete) {
                res.header('X-Error-Message', 'Athlete not found');
                res.status(404).json({ error: 'Athlete not found' });
                return;
            }

            res.header('X-Response-Time', '50ms');
            res.header('Cache-Control', 'max-age=3600');
            
            res.status(200).json({
                data: athlete,
                _links: {
                    self: { href: `/api/athletes/${athlete.id}` },
                    sports: { href: `/api/athletes/${athlete.id}/sports` },
                    competitions: { href: `/api/athletes/${athlete.id}/competitions` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createAthlete: async (req: Request, res: Response): Promise<void> => {
        try {
            const newAthlete: Athlete = {
                id: (athletes.length + 1).toString(),
                ...req.body
            };

            if (!newAthlete.firstName || !newAthlete.lastName) {
                res.header('X-Error-Message', 'Missing required fields');
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            athletes.push(newAthlete);
            
            res.header('Location', `/api/athletes/${newAthlete.id}`);
            res.header('X-Created-At', new Date().toISOString());
            
            res.status(201).json({
                data: newAthlete,
                _links: {
                    self: { href: `/api/athletes/${newAthlete.id}` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateAthlete: async (req: Request, res: Response): Promise<void> => {
        try {
            const athleteIndex = athletes.findIndex(a => a.id === req.params.id);
            
            if (athleteIndex === -1) {
                res.header('X-Error-Message', 'Athlete not found');
                res.status(404).json({ error: 'Athlete not found' });
                return;
            }

            if (!req.body.firstName || !req.body.lastName) {
                res.header('X-Error-Message', 'Missing required fields');
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const updatedAthlete: Athlete = {
                ...athletes[athleteIndex],
                ...req.body,
                id: req.params.id
            };

            athletes[athleteIndex] = updatedAthlete;

            res.header('X-Updated-At', new Date().toISOString());
            res.header('Last-Modified', new Date().toUTCString());
            res.header('Cache-Control', 'no-cache');

            res.status(200).json({
                data: updatedAthlete,
                _links: {
                    self: { href: `/api/athletes/${updatedAthlete.id}` },
                    sports: { href: `/api/athletes/${updatedAthlete.id}/sports` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteAthlete: async (req: Request, res: Response): Promise<void> => {
        try {
            const athleteIndex = athletes.findIndex(a => a.id === req.params.id);
            
            if (athleteIndex === -1) {
                res.header('X-Error-Message', 'Athlete not found');
                res.status(404).json({ error: 'Athlete not found' });
                return;
            }

            athletes.splice(athleteIndex, 1);

            res.header('X-Deleted-At', new Date().toISOString());
            res.header('X-Resource-ID', req.params.id);
            res.header('Cache-Control', 'no-store');

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAthletesSports: async (req: Request, res: Response): Promise<void> => {
        try {
            const athlete = athletes.find(a => a.id === req.params.id);
            
            if (!athlete) {
                res.header('X-Error-Message', 'Athlete not found');
                res.status(404).json({ error: 'Athlete not found' });
                return;
            }

            res.header('X-Total-Count', athlete.sportsIds.length.toString());
            res.header('X-Response-Time', '50ms');
            res.header('Cache-Control', 'max-age=3600');

            res.status(200).json({
                data: athlete.sportsIds,
                _links: {
                    self: { href: `/api/athletes/${athlete.id}/sports` },
                    athlete: { href: `/api/athletes/${athlete.id}` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};