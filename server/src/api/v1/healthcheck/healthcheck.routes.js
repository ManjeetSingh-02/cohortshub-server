// import local modules
import { healthCheck } from './healthcheck.controllers.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route GET /
router.get('/', healthCheck);

// export router
export default router;
