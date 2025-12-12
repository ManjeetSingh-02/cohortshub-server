// import local modules
import { APIError } from '../api/error.api.js';
import { asyncHandler } from './async-handler.js';

// function to check for any validation errors
export const validateSchema = zodSchema =>
  asyncHandler(async (req, _, next) => {
    // get validation result by parsing the request-body with the given zod-schema
    const validationResult = zodSchema.safeParse(req.body);

    // if validation fails, throw an error
    if (!validationResult.success)
      throw new APIError(400, {
        type: 'Validation Error',
        message: 'Invalid request data',
        issues: validationResult.error.issues.map(
          issue => `${issue.path.join(', ') || 'All fields'} ${issue.message}`
        ),
      });

    // forward request to next middleware
    next();
  });
