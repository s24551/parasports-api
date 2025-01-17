import { Request, Response } from 'express';
import { paraSports, ParaSport } from '../models/ParaSport';

export const paraSportController = {
    getAllSports: async (req: Request, res: Response): Promise<void> => {
        try {
            const category = req.query.category as string;
            const filteredSports = category 
                ? paraSports.filter(sport => sport.category === category)
                : paraSports;

            res.header('X-Total-Count', filteredSports.length.toString());
            res.header('X-Response-Time', '100ms');
            res.header('Cache-Control', 'max-age=3600');
            
            res.status(200).json({
                data: filteredSports,
                _links: {
                    self: { href: '/api/sports' },
                    athletes: { href: '/api/athletes' },
                    competitions: { href: '/api/competitions' }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getSportById: async (req: Request, res: Response): Promise<void> => {
        try {
            const sport = paraSports.find(s => s.id === req.params.id);
            
            if (!sport) {
                res.header('X-Error-Message', 'Sport not found');
                res.status(404).json({ error: 'Sport not found' });
                return;
            }

            res.header('X-Response-Time', '50ms');
            res.header('Cache-Control', 'max-age=3600');
            
            res.status(200).json({
                data: sport,
                _links: {
                    self: { href: `/api/sports/${sport.id}` },
                    athletes: { href: `/api/sports/${sport.id}/athletes` },
                    competitions: { href: `/api/sports/${sport.id}/competitions` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createSport: async (req: Request, res: Response): Promise<void> => {
        try {
            const newSport: ParaSport = {
                id: (paraSports.length + 1).toString(),
                ...req.body
            };

            if (!newSport.name || !newSport.category) {
                res.header('X-Error-Message', 'Missing required fields');
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            paraSports.push(newSport);
            
            res.header('Location', `/api/sports/${newSport.id}`);
            res.header('X-Created-At', new Date().toISOString());
            
            res.status(201).json({
                data: newSport,
                _links: {
                    self: { href: `/api/sports/${newSport.id}` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateSport: async (req: Request, res: Response): Promise<void> => {
        try {
            const sportIndex = paraSports.findIndex(s => s.id === req.params.id);
            
            if (sportIndex === -1) {
                res.header('X-Error-Message', 'Sport not found');
                res.status(404).json({ error: 'Sport not found' });
                return;
            }

            const updatedSport: ParaSport = {
                ...paraSports[sportIndex],
                ...req.body,
                id: req.params.id
            };

            paraSports[sportIndex] = updatedSport;

            res.header('X-Updated-At', new Date().toISOString());
            res.header('Last-Modified', new Date().toUTCString());
            res.header('Cache-Control', 'no-cache');

            res.status(200).json({
                data: updatedSport,
                _links: {
                    self: { href: `/api/sports/${updatedSport.id}` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteSport: async (req: Request, res: Response): Promise<void> => {
        try {
            const sportIndex = paraSports.findIndex(s => s.id === req.params.id);
            
            if (sportIndex === -1) {
                res.header('X-Error-Message', 'Sport not found');
                res.status(404).json({ error: 'Sport not found' });
                return;
            }

            paraSports.splice(sportIndex, 1);

            res.header('X-Deleted-At', new Date().toISOString());
            res.header('X-Resource-ID', req.params.id);
            res.header('Cache-Control', 'no-store');

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};