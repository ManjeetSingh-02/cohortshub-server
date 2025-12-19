// import local modules
import { availableUserRoles } from '../../../utils/constants.js';

// import external modules
import { z } from 'zod';

// zod schema for update user role
export const updateUserRoleSchema = z.object({
  body: z.object({
    userEmail: z.email({ message: 'userEmail is required' }).trim().toLowerCase(),
    newRole: z.enum(availableUserRoles),
  }),
});
