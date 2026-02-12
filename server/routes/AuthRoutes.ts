// import express from 'express';
// import { loginUser, registerUser , verifyUser} from '../controllers/AuthControllers';
// const AuthRouter = express.Router();
// AuthRouter.post('/register',registerUser);
// AuthRouter.post('/login',loginUser);
// AuthRouter.get('/verify',verifyUser);

// export default AuthRouter;

// routes/authroutes.ts
import express from 'express';
import { 
    loginUser, 
    registerUser, 
    verifyUser,
    logoutUser,
    getUserProfile
} from '../controllers/AuthControllers.js'; // ADD .js extension here!
import {auth} from '../middlewares/auth.js';

const AuthRouter = express.Router();

// Public routes
AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);
AuthRouter.get('/verify',auth, verifyUser);

// Protected routes (add these)
AuthRouter.post('/logout',auth, logoutUser);
AuthRouter.get('/profile', getUserProfile);

export default AuthRouter;

