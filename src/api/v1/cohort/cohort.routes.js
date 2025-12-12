// import local modules
import { validateSchema } from '../../../utils/route-protector.js';
import { createCohort } from './cohort.controllers.js';
import { createCohortSchema } from './cohort.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /
router.post('/', validateSchema(createCohortSchema), createCohort);

// export router
export default router;
