import type { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';

// Controller to get all user's thumbnails
export const getUserThumbnails = async (req: Request, res: Response) => {
    try {
        // ✅ Use JWT userId instead of session
        const userId = (req as any).userId;
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }
        
        const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
        res.json({ thumbnails });
    } catch (error: any) {
        console.error('Error fetching thumbnails:', error);
        res.status(500).json({ message: error.message });
    }
};

// Controller to get a single thumbnail by id
export const getThumbnailById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // ✅ Use JWT userId instead of session
        const userId = (req as any).userId;
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }
        
        const thumbnail = await Thumbnail.findOne({ _id: id, userId });
        
        if (!thumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }
        
        res.json({ thumbnail });
    } catch (error: any) {
        console.error('Error fetching thumbnail:', error);
        res.status(500).json({ message: error.message });
    }
};
