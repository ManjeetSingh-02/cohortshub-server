// import local modules
import { googleLogin, googleLoginCallback, logout, refreshTokens } from './auth.controllers.js';
import { isLoggedIn, isSessionActive } from '../../../utils/route-protectors/index.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route GET /login/google
router.get('/login/google', isSessionActive, googleLogin);

// @route GET /login/google/callback
router.get('/login/google/callback', googleLoginCallback);

// @route POST /logout
router.post('/logout', isLoggedIn, logout);

// @route PATCH /token/refresh
router.patch('/token/refresh', refreshTokens);

// export router
export default router;
