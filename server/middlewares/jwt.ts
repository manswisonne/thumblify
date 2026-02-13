import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '83436acbc9c85ec5dfd1940fd6654c2e92a961d74bc45a8c6ee13f4b87457277e673a326ffc12fc5cb06786abb9044a7741eea3d845ecfcd3d52ad7b7623cdcb';

export const generateToken = (userId: string): string => {
    console.log('🔑 Generating token for userId:', userId);
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ Token generated successfully');
    return token;
};

export const verifyToken = (token: string): { userId: string } | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        console.log('✅ Token verified for userId:', decoded.userId);
        return decoded;
    } catch (error) {
        console.error('❌ Token verification failed:', error);
        return null;
    }
};
