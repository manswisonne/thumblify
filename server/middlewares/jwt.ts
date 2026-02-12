import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '83436acbc9c85ec5dfd1940fd6654c2e92a961d74bc45a8c6ee13f4b87457277e673a326ffc12fc5cb06786abb9044a7741eea3d845ecfcd3d52ad7b7623cdcb';

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): { userId: string } | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
        return null;
    }
};