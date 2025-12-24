// import local modules
import {
  createGroup,
  getCohortDetailsandGroups,
  getGroupDetails,
  updateGroupAnnouncements,
  updateGroupRoleRequirements,
} from './group.controllers.js';
import {
  isUserAlreadyInAGroup,
  isUserAllowedInGroup,
  validateSchema,
} from '../../../utils/route-protector.js';
import {
  createGroupSchema,
  updateGroupAnnouncementsSchema,
  updateGroupRoleRequirementsSchema,
} from './group.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router({ mergeParams: true });

// @route GET /
router.get('/', getCohortDetailsandGroups);

// @route POST /
router.post('/', isUserAlreadyInAGroup, validateSchema(createGroupSchema), createGroup);

// @route GET /:groupName
router.get('/:groupName', isUserAllowedInGroup, getGroupDetails);

// @route PATCH /:groupName
router.patch(
  '/:groupName',
  isUserAllowedInGroup,
  validateSchema(updateGroupRoleRequirementsSchema),
  updateGroupRoleRequirements
);

// @route PATCH /:groupName/announcements
router.patch(
  '/:groupName/announcements',
  isUserAllowedInGroup,
  validateSchema(updateGroupAnnouncementsSchema),
  updateGroupAnnouncements
);

// export router
export default router;
