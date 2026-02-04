

// CRITICAL: Load environment variables FIRST before anything else
// import dotenv from 'dotenv';
// dotenv.config();

// // Now import everything else after env vars are loaded
// import express from 'express';
// import cors from 'cors';
// import type { Request, Response } from 'express';
// import connectDB from './configs/db.js';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import mongoose from 'mongoose';
// import AuthRouter from './routes/authroutes.js';

// declare module 'express-session' {
//     interface SessionData {
//         isLoggedIn: boolean;
//         userId: string;
//     }   
// }

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:5173'],
//     credentials: true,
// }));

// // Connect to database FIRST
// connectDB().then(() => {
//     // Setup session AFTER database connection is established
//     // This way MongoStore uses the existing mongoose connection
//     app.use(session({
//         secret: process.env.SESSION_SECRET as string,
//         resave: false,
//         saveUninitialized: false,
//         cookie: { 
//             maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//             httpOnly: true,
//             secure: false, // Set to true if using HTTPS
//             sameSite: 'lax'
//         },
//         store: MongoStore.create({
//             client: mongoose.connection.getClient(), // Use existing connection
//             collectionName: 'sessions',
//         })
//     }));

//     // Routes
//     app.get('/', (req: Request, res: Response) => {
//         res.send('Server is Live!');
//     });
    
//     app.use('/api/auth', AuthRouter);

//     // 404 handler
//     app.use((req: Request, res: Response) => {
//         res.status(404).json({ error: 'Route not found' });
//     });

//     // Start server
//     app.listen(port, () => {
//         console.log(`🚀 Server is running at http://localhost:${port}`);
//     });
// }).catch((error) => {
//     console.error('❌ Failed to connect to database:', error);
//     process.exit(1);
// });
// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import type { Request, Response } from 'express';
// import connectDB from './configs/db.js';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import mongoose from 'mongoose';
// import AuthRouter from './routes/authroutes.js';

// declare module 'express-session' {
//     interface SessionData {
//         isLoggedIn: boolean;
//         userId: string;
//     }   
// }

// const app = express();
// const port = process.env.PORT || 3000;

// // Basic middleware (no session yet)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:5173'],
//     credentials: true,
// }));

// // Connect to database and setup everything
// const startServer = async () => {
//     try {
//         // Connect to MongoDB
//         await connectDB();
//         console.log('✅ MongoDB connected');

//         // Wait for connection to be fully ready
//         if (mongoose.connection.readyState !== 1) {
//             await new Promise(resolve => mongoose.connection.once('connected', resolve));
//         }

//         // Now setup session with MongoStore using the connected client
//         app.use(session({
//             secret: process.env.SESSION_SECRET as string,
//             resave: false,
//             saveUninitialized: false,
//             cookie: { 
//                 maxAge: 1000 * 60 * 60 * 24 * 7,
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: 'lax'
//             },
//             store: MongoStore.create({
//                 client: mongoose.connection.getClient(),
//                 collectionName: 'sessions',
//                 touchAfter: 24 * 3600 // lazy session update
//             })
//         }));

//         console.log('✅ Session store configured');

//         // Routes (must be after session middleware)
//         app.get('/', (req: Request, res: Response) => {
//             res.send('Server is Live!');
//         });
        
//         app.use('/api/auth', AuthRouter);

//         // 404 handler
//         app.use((req: Request, res: Response) => {
//             res.status(404).json({ error: 'Route not found' });
//         });

//         // Start server
//         app.listen(port, () => {
//             console.log(`🚀 Server running at http://localhost:${port}`);
//             console.log(`📡 Test at: http://localhost:${port}/api/auth/register`);
//         });

//     } catch (error) {
//         console.error('❌ Failed to start server:', error);
//         process.exit(1);
//     }
// };

// // Start the server
// startServer();
// CRITICAL: Load environment variables FIRST
// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import type { Request, Response } from 'express';
// import connectDB from './configs/db.js';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import mongoose from 'mongoose';
// import AuthRouter from './routes/authroutes.js';

// declare module 'express-session' {
//     interface SessionData {
//         isLoggedIn: boolean;
//         userId: string;
//     }   
// }

// const app = express();
// const port = process.env.PORT || 3000;

// // Basic middleware (no session yet)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:5173'],
//     credentials: true,
// }));

// // Connect to database and setup everything
// const startServer = async () => {
//     try {
//         // Connect to MongoDB
//         await connectDB();
//         console.log('✅ MongoDB connected');

//         // Wait for connection to be fully ready
//         if (mongoose.connection.readyState !== 1) {
//             await new Promise(resolve => mongoose.connection.once('connected', resolve));
//         }

//         // Now setup session with MongoStore using mongooseConnection
//         app.use(session({
//             secret: process.env.SESSION_SECRET as string,
//             resave: false,
//             saveUninitialized: false,
//             cookie: { 
//                 maxAge: 1000 * 60 * 60 * 24 * 7,
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: 'lax'
//             },
//             store: MongoStore.create({
//                 mongooseConnection: mongoose.connection,
//                 collectionName: 'sessions',
//                 touchAfter: 24 * 3600
//             })
//         }));

//         console.log('✅ Session store configured');

//         // Routes (must be after session middleware)
//         app.get('/', (req: Request, res: Response) => {
//             res.send('Server is Live!');
//         });
        
//         app.use('/api/auth', AuthRouter);

//         // 404 handler
//         app.use((req: Request, res: Response) => {
//             res.status(404).json({ error: 'Route not found' });
//         });

//         // Start server
//         app.listen(port, () => {
//             console.log(`🚀 Server running at http://localhost:${port}`);
//             console.log(`📡 Test at: http://localhost:${port}/api/auth/register`);
//         });

//     } catch (error) {
//         console.error('❌ Failed to start server:', error);
//         process.exit(1);
//     }
// };

// // Start the server
// startServer();
// CRITICAL: Load environment variables FIRST
// 
// CRITICAL: Load environment variables FIRST
// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import type { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import AuthRouter from './routes/AuthRoutes.js';
// import ThumbnailRouter from './routes/ThumbnailRoutes.js';
// import UserRouter from './routes/UserRoutes.js';
// declare module 'express-session' {
//     interface SessionData {
//         isLoggedIn: boolean;
//         userId: string;
//     }   
// }

// const app = express();
// const port = process.env.PORT || 3000;

// // Basic middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:5173'],
//     credentials: true,
// }));

// // Session middleware (BEFORE routes, WITHOUT MongoStore for now)
// app.use(session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//         maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//         httpOnly: true,
//         secure: false,
//         sameSite: 'lax'
//     }
//     // Using memory store - sessions won't persist on restart but NO SSL ERRORS
// }));

// // Connect to MongoDB
// const startServer = async () => {
//     try {
//         console.log('Connecting to MongoDB...');
//         await mongoose.connect(process.env.MONGODB_URI!);
//         console.log('✅ MongoDB connected successfully');

//         // Routes
//         app.get('/', (req: Request, res: Response) => {
//             res.json({ 
//                 message: 'Server is Live!',
//                 timestamp: new Date().toISOString()
//             });
//         });
        
//         app.use('/api/auth', AuthRouter);
//         app.use('/api/thumbnail', ThumbnailRouter);
//         app.use('/api/user', UserRouter);
//         // 404 handler
//         app.use((req: Request, res: Response) => {
//             res.status(404).json({ error: 'Route not found' });
//         });

//         // Start server
//         app.listen(port, () => {
//             console.log(`🚀 Server running at http://localhost:${port}`);
//             console.log(`📡 API endpoints:`);
//             console.log(`   POST http://localhost:${port}/api/auth/register`);
//             console.log(`   POST http://localhost:${port}/api/auth/login`);
//             console.log(`   POST http://localhost:${port}/api/auth/logout`);
//             console.log(`   GET  http://localhost:${port}/api/auth/verify`);
//             console.log(`   GET  http://localhost:${port}/api/auth/profile`);
//         });

//     } catch (error) {
//         console.error('❌ Failed to start server:', error);
//         process.exit(1);
//     }
// };

// // Start the server
// startServer();




import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
// import MongoStore from 'connect-mongo/build/main/lib/MongoStore.js';

// 1. Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import AuthRouter from './routes/AuthRoutes.js';
import ThumbnailRouter from './routes/ThumbnailRoutes.js';
import UserRouter from './routes/UserRoutes.js';
import MongoStore from 'connect-mongo';

declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string;
    }   
}

const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://thumblify-ebon.vercel.app'],
    credentials: true,
}));

// 2. Serve the 'uploads' folder as static
// This allows you to access images via http://localhost:3000/uploads/filename.png
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/',
    },
     // Set to true if using HTTPS},
        // httpOnly: true,
        // secure: false, // Set to true if using HTTPS
        // sameSite: 'lax'
        store: MongoStore.create({
            mongoUrl : process.env.MONGODB_URI as string,
            collectionName: 'sessions',
        })
    }
,));

// Connect to MongoDB
const startServer = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('✅ MongoDB connected successfully');

        // Routes
        app.get('/', (req: Request, res: Response) => {
            res.json({ 
                message: 'Server is Live!',
                timestamp: new Date().toISOString()
            });
        });
        
        app.use('/api/auth', AuthRouter);
        app.use('/api/thumbnail', ThumbnailRouter);
        app.use('/api/user', UserRouter);

        // 404 handler
        app.use((req: Request, res: Response) => {
            res.status(404).json({ error: 'Route not found' });
        });

        // Start server
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
            console.log(`📡 Static assets served at http://localhost:${port}/uploads`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();