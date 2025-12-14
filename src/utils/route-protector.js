// import local modules
import { APIError } from '../api/error.api.js';
import { asyncHandler } from './async-handler.js';
import { REFRESH_TOKEN_COOKIE_CONFIG } from './constants.js';

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

// function to check for an active session
export const isSessionActive = asyncHandler(async (req, _, next) => {
  // if refresh-token cookie is present, throw an error
  if (req.cookies[REFRESH_TOKEN_COOKIE_CONFIG.NAME])
    throw new APIError(400, {
      type: 'Active Session Error',
      message: 'User already logged in with an active session',
    });

  // forward request to next middleware
  next();
});
