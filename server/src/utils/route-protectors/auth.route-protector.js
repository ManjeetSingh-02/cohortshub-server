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
      message: 'Access Token is missing or in an invalid format',
    });

  // decode access token
  const decodedToken = decodeAccessToken(authorizationHeaders.split(' ')[1]);

  // check if user exists
  const loggedInUser = await User.findById(decodedToken?.id)
    .select('_id email role currentGroup')
    .lean();
  if (!loggedInUser)
    throw new APIErrorResponse(401, {
      type: 'Authentication Error',
      message: 'User associated with this token no longer exists',
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

// sub-function to decode access token
function decodeAccessToken(accessToken) {
  try {
    return jwt.verify(accessToken, envConfig.ACCESS_TOKEN_SECRET);
  } catch (error) {
    // if token is expired, throw an token expired error
    if (error.name === 'TokenExpiredError')
      throw new APIErrorResponse(401, {
        type: 'Access Token Expired Error',
        message: 'Access Token expired, generate a new one',
      });

    // for any other error, throw a generic invalid token error
    throw new APIErrorResponse(401, {
      type: 'Access Token Error',
      message: 'Invalid Access Token',
    });
  }
}
