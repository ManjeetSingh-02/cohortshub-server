// import local modules
import { getCohortDetailsandGroups } from './group.controllers.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router({ mergeParams: true });

// @route GET /
router.get('/', getCohortDetailsandGroups);

// export router
export default router;
