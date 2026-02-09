import { z } from 'zod';

// zod schema for environment variables
const envSchema = z.object({
  VITE_API_URL: z.url({ error: 'VITE_API_URL must be a valid URL' }),
});

// function to validate environment variables
function validateEnv() {
  // get parsed result of environment variables
  const result = envSchema.safeParse(import.meta.env);

  // if validation succeeds, return the validated environment variables
  if (result.success) return result.data;

  // prepare validation error messages
  const errorMessages = result.error.issues
    .map(issue => `${issue.path.join('.')}: ${issue.message}`)
    .join('\n');

  // if validation fails, throw an error with details
  throw new Error(`Env variables validation: ❌\n${errorMessages}`);
}

// config for environment variables
export const envConfig = validateEnv();
