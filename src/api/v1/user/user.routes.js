// import local modules
import { USER_ROLES } from '../../../utils/constants.js';
import { hasRequiredRole, isLoggedIn } from '../../../utils/route-protector.js';
import { getAllUsers, getUser } from './user.controllers.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route GET /
router.get('/', isLoggedIn, hasRequiredRole([USER_ROLES.SYSTEM_ADMIN]), getAllUsers);

// @route GET /:username
router.get('/:username', isLoggedIn, getUser);

// export router
export default router;
