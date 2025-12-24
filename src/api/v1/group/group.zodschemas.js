// import external modules
import { z } from 'zod';

// zod schema for createGroup
export const createGroupSchema = z.object({
  body: z.object({
    groupName: z
      .string()
      .trim()
      .nonempty({ error: 'groupName is required' })
      .min(5, { error: 'groupName must be at least 5 characters long' })
      .max(20, { error: 'groupName must be at most 20 characters long' }),
  }),
});

// zod schema for updateGroupRoleRequirements
export const updateGroupRoleRequirementsSchema = z.object({
  params: z.object({
    groupName: z.string().trim().nonempty({ error: 'groupName is required' }),
  }),
  body: z.object({
    roleRequirements: z.array(
      z.object({
        roleName: z.string().trim().nonempty({ error: 'Atleast one roleName is required' }),
        techStack: z
          .array(
            z.object({
              skillName: z.string().trim().nonempty({ error: 'Atleast one skillName is required' }),
              experienceInMonths: z
                .number()
                .min(1, { error: 'experienceInMonths must be at least 1' }),
              isMandatory: z.boolean(),
            })
          )
          .nonempty({ message: 'At least one techStack item is required' }),
      })
    ),
  }),
});
