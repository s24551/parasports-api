import { Request, Response } from 'express';
import { competitions, Competition } from '../models/Competition';

export const competitionController = {
    getAllCompetitions: async (req: Request, res: Response): Promise<void> => {
        try {
            const { status, type, sportId } = req.query;
            
            let filteredCompetitions = [...competitions];
            
            if (status) {
                filteredCompetitions = filteredCompetitions.filter(c => c.status === status);
            }
            if (type) {
                filteredCompetitions = filteredCompetitions.filter(c => c.type === type);
            }
            if (sportId) {
                filteredCompetitions = filteredCompetitions.filter(c => c.sportId === sportId);
            }

            res.header('X-Total-Count', filteredCompetitions.length.toString());
            res.header('X-Response-Time', '100ms');
            res.header('Cache-Control', 'max-age=3600');
            
            res.status(200).json({
                data: filteredCompetitions,
                _links: {
                    self: { href: '/api/competitions' },
                    sports: { href: '/api/sports' },
                    athletes: { href: '/api/athletes' }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getCompetitionById: async (req: Request, res: Response): Promise<void> => {
        try {
            const competition = competitions.find(c => c.id === req.params.id);
            
            if (!competition) {
                res.header('X-Error-Message', 'Competition not found');
                res.status(404).json({ error: 'Competition not found' });
                return;
            }

            res.header('X-Response-Time', '50ms');
            res.header('Cache-Control', 'max-age=3600');
            
            res.status(200).json({
                data: competition,
                _links: {
                    self: { href: `/api/competitions/${competition.id}` },
                    sport: { href: `/api/sports/${competition.sportId}` },
                    participants: { href: `/api/competitions/${competition.id}/participants` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createCompetition: async (req: Request, res: Response): Promise<void> => {
        try {
            const newCompetition: Competition = {
                id: (competitions.length + 1).toString(),
                ...req.body,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate)
            };

            if (!newCompetition.name || !newCompetition.sportId) {
                res.header('X-Error-Message', 'Missing required fields');
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Sprawdzanie dat
            if (newCompetition.endDate < newCompetition.startDate) {
                res.header('X-Error-Message', 'End date cannot be before start date');
                res.status(400).json({ error: 'End date cannot be before start date' });
                return;
            }

            competitions.push(newCompetition);
            
            res.header('Location', `/api/competitions/${newCompetition.id}`);
            res.header('X-Created-At', new Date().toISOString());
            
            res.status(201).json({
                data: newCompetition,
                _links: {
                    self: { href: `/api/competitions/${newCompetition.id}` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateCompetition: async (req: Request, res: Response): Promise<void> => {
        try {
            const competitionIndex = competitions.findIndex(c => c.id === req.params.id);
            
            if (competitionIndex === -1) {
                res.header('X-Error-Message', 'Competition not found');
                res.status(404).json({ error: 'Competition not found' });
                return;
            }

            const updatedCompetition: Competition = {
                ...competitions[competitionIndex],
                ...req.body,
                id: req.params.id,
                startDate: req.body.startDate ? new Date(req.body.startDate) : competitions[competitionIndex].startDate,
                endDate: req.body.endDate ? new Date(req.body.endDate) : competitions[competitionIndex].endDate
            };

            competitions[competitionIndex] = updatedCompetition;

            res.header('X-Updated-At', new Date().toISOString());
            res.header('Last-Modified', new Date().toUTCString());
            res.header('Cache-Control', 'no-cache');

            res.status(200).json({
                data: updatedCompetition,
                _links: {
                    self: { href: `/api/competitions/${updatedCompetition.id}` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteCompetition: async (req: Request, res: Response): Promise<void> => {
        try {
            const competitionIndex = competitions.findIndex(c => c.id === req.params.id);
            
            if (competitionIndex === -1) {
                res.header('X-Error-Message', 'Competition not found');
                res.status(404).json({ error: 'Competition not found' });
                return;
            }

            if (competitions[competitionIndex].status === 'Ongoing') {
                res.header('X-Error-Message', 'Cannot delete ongoing competition');
                res.status(409).json({ error: 'Cannot delete ongoing competition' });
                return;
            }

            competitions.splice(competitionIndex, 1);

            res.header('X-Deleted-At', new Date().toISOString());
            res.header('X-Resource-ID', req.params.id);
            res.header('Cache-Control', 'no-store');

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getCompetitionParticipants: async (req: Request, res: Response): Promise<void> => {
        try {
            const competition = competitions.find(c => c.id === req.params.id);
            
            if (!competition) {
                res.header('X-Error-Message', 'Competition not found');
                res.status(404).json({ error: 'Competition not found' });
                return;
            }

            res.header('X-Total-Count', competition.participantIds.length.toString());
            res.header('X-Response-Time', '50ms');
            res.header('Cache-Control', 'max-age=3600');

            res.status(200).json({
                data: competition.participantIds,
                _links: {
                    self: { href: `/api/competitions/${competition.id}/participants` },
                    competition: { href: `/api/competitions/${competition.id}` }
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
