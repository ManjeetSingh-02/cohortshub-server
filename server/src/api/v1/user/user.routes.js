// import local modules
import { USER_ROLES } from '../../../utils/constants.js';
import {
  hasRequiredRole,
  isLoggedIn,
  validateSchema,
} from '../../../utils/route-protectors/index.js';
import {
  createCohortAdminUser,
  deleteCohortAdminUser,
  getUser,
  updateUserProfessionalProfiles,
} from './user.controllers.js';
import { cohortAdminUserSchema, updateUserProfessionalProfilesSchema } from './user.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route GET /profile
router.get('/profile', isLoggedIn, getUser);

// @route PATCH /professional-profiles
router.patch(
  '/professional-profiles',
  isLoggedIn,
  validateSchema(updateUserProfessionalProfilesSchema),
  updateUserProfessionalProfiles
);

// @route POST /cohort-admin
router.post(
  '/cohort-admin',
  isLoggedIn,
  hasRequiredRole([USER_ROLES.SYSTEM_ADMIN]),
  validateSchema(cohortAdminUserSchema),
  createCohortAdminUser
);

// @route DELETE /cohort-admin
router.delete(
  '/cohort-admin',
  isLoggedIn,
  hasRequiredRole([USER_ROLES.SYSTEM_ADMIN]),
  validateSchema(cohortAdminUserSchema),
  deleteCohortAdminUser
);

// export router
export default router;
