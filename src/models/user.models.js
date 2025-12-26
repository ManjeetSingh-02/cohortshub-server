// import local modules
import {
  USER_ROLES,
  availableUserRoles,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../utils/constants.js';
import { envConfig } from '../utils/env.js';

// import external modules
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// helper function to check if user is system_admin for conditional required fields
function isFieldRequired() {
  return this.role !== USER_ROLES.SYSTEM_ADMIN;
}

// schema for techStack
const techStackSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    experienceInMonths: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

// schema for user expertise
const userExpertiseSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [techStackSchema],
      required: true,
    },
  },
  { _id: false }
);

// schema for socialLink
const socialLinkSchema = new mongoose.Schema(
  {
    platformName: {
      type: String,
      required: true,
      trim: true,
    },
    platformURL: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

// schema for user
const userSchema = new mongoose.Schema(
  {
    googleID: {
      type: String,
      required: isFieldRequired,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 15,
    },
    userExpertise: {
      type: [userExpertiseSchema],
      default: [],
    },
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
    role: {
      type: String,
      enum: availableUserRoles,
      default: USER_ROLES.STUDENT,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    currentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// method to generateAccessToken
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, envConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_LIFETIME,
  });
};

// method to generateRefreshToken
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, envConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFETIME,
  });
};

// export user model
export default mongoose.model('User', userSchema);
