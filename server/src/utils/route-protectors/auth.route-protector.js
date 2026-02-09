// import local modules
import { APIErrorResponse } from '../../api/v1/response/response.api.js';
import { asyncHandler } from '../async-handler.js';
import { User } from '../../models/index.js';
import { envConfig } from '../env.js';

// import external modules
import jwt from 'jsonwebtoken';

// function to check for logged-in user
export const isLoggedIn = asyncHandler(async (req, _, next) => {
  // get authorization headers
  const authorizationHeaders = req.headers.authorization;
  if (!authorizationHeaders || !authorizationHeaders.startsWith('Bearer '))
    throw new APIErrorResponse(401, {
      type: 'Authentication Error',
      message: 'Access token is invalid',
    });

  // verify access token
  const verifiedToken = verifyAccessToken(authorizationHeaders.split(' ')[1]);

  // check if user exists
  const loggedInUser = await User.findById(verifiedToken?.id)
    .select('_id email role currentGroup')
    .lean();
  if (!loggedInUser)
    throw new APIErrorResponse(401, {
      type: 'Authentication Error',
      message: 'Access token is invalid',
    });

  // set user in request object
  req.user = {
    id: loggedInUser._id,
    email: loggedInUser.email,
    role: loggedInUser.role,
    currentGroup: loggedInUser.currentGroup,
  };

  // forward request to next middleware
  next();
});

// sub-function to verify access token
function verifyAccessToken(accessToken) {
  try {
    return jwt.verify(accessToken, envConfig.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new APIErrorResponse(401, {
      type: 'Authentication Error',
      message: 'Access token is invalid',
    });
  }
}
