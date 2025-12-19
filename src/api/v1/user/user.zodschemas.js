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

// zod schema for update user profile
export const updateUserProfileSchema = z.object({
  body: z.object({
    newUserExpertise: z
      .array(
        z.object({
          roleName: z.string().min(1, { message: 'roleName is required' }).trim(),
          techStack: z
            .array(
              z.object({
                skillName: z.string().min(1, { message: 'skillName is required' }).trim(),
                experienceInMonths: z
                  .number()
                  .min(0, { message: 'experienceInMonths must be at least 0' }),
              })
            )
            .min(1, { message: 'At least one techStack is required' }),
        })
      )
      .optional(),
    newSocialLinks: z
      .array(
        z.object({
          platformName: z.string().min(1, { message: 'platformName is required' }).trim(),
          platformURL: z.url({ message: 'Valid platformURL is required' }).trim(),
        })
      )
      .optional(),
  }),
});
