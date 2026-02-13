
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt.js';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check both 'Authorization' and 'authorization' (case-insensitive)
        const authHeader = req.headers.authorization || req.headers.Authorization;
        
        console.log('🔍 Auth middleware - Headers:', req.headers.authorization);
        
        if (!authHeader) {
            console.log('❌ No authorization header found');
            return res.status(401).json({ error: 'No token provided' });
        }
        
        if (!authHeader.startsWith('Bearer ')) {
            console.log('❌ Invalid authorization format');
            return res.status(401).json({ error: 'Invalid token format' });
        }
        
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        console.log('🔑 Token extracted:', token.substring(0, 20) + '...');
        
        // Verify token
        const decoded = verifyToken(token);
        
        if (!decoded) {
            console.log('❌ Token verification failed');
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        console.log('✅ Token verified, userId:', decoded.userId);
        
        // Add userId to request
        (req as any).userId = decoded.userId;
        
        next();
    } catch (error) {
        console.error('❌ Auth middleware error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
};
