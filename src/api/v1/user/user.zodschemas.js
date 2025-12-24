// import local modules
import { availableUserRoles } from '../../../utils/constants.js';

// import external modules
import { z } from 'zod';

// zod schema for update user role
export const updateUserRoleSchema = z.object({
  body: z.object({
    userEmail: z.email({ error: 'Valid userEmail is required' }).trim().toLowerCase(),
    newRole: z.enum(availableUserRoles),
  }),
});

// zod schema for update user profile
export const updateUserProfileSchema = z.object({
  body: z.object({
    newUserExpertise: z
      .array(
        z.object({
          roleName: z.string().trim().nonempty({ error: 'Atleast one roleName is required' }),
          techStack: z
            .array(
              z.object({
                skillName: z
                  .string()
                  .trim()
                  .nonempty({ error: 'Atleast one skillName is required' }),
                experienceInMonths: z
                  .number()
                  .min(1, { error: 'experienceInMonths must be at least 1' }),
              })
            )
            .nonempty({ error: 'At least one techStack is required' }),
        })
      )
      .optional(),
    newSocialLinks: z
      .array(
        z.object({
          platformName: z
            .string()
            .nonempty({ error: 'Atleast one platformName is required' })
            .trim(),
          platformURL: z.url({ error: 'Valid platformURL is required' }).trim(),
        })
      )
      .optional(),
  }),
});
