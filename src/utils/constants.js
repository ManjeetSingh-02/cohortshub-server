// import local modules
import { envConfig } from './env.js';

// google OAuth constants
export const GOOGLE_OAUTH_CONFIG = {
  AUTH_URI: 'https://accounts.google.com/o/oauth2/v2/auth',
  TOKEN_URI: 'https://oauth2.googleapis.com/token',
  USERINFO_URI: 'https://www.googleapis.com/oauth2/v2/userinfo',
  DEFAULT_SCOPES: 'openid email profile',
  SCOPE_GRANT_TYPE: 'authorization_code',
};

// google OAuth Cookie constants
export const COOKIE_CONFIG = {
  STATE_NAME: 'oauthState',
  NONCE_NAME: 'oauthNonce',
  OPTIONS: {
    httpOnly: true,
    secure: envConfig.NODE_ENV === 'production',
    signed: true,
    maxAge: 5 * 60 * 1000,
  },
};
