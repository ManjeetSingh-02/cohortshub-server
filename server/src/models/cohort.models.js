// import local modules
import { USER_ROLES } from '../utils/constants.js';
import { User } from './index.js';

// import external modules
import mongoose from 'mongoose';

// schema for cohort
const cohortSchema = new mongoose.Schema(
  {
    cohortName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 30,
    },
    cohortDescription: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 200,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    allowedUserEmails: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// pre-hook to check if document is new and add system admin email to allowedUserEmails
cohortSchema.pre('save', async function () {
  if (this.isNew) {
    // fetch system admin from db
    const systemAdmin = await User.findOne({ role: USER_ROLES.SYSTEM_ADMIN })
      .select('email')
      .lean();

    // if systemAdmin exists, add it's email to allowedUserEmails
    if (systemAdmin && !this.allowedUserEmails.includes(systemAdmin.email))
      this.allowedUserEmails.push(systemAdmin.email);
  }
});

// virtual field to get all groups associated with a cohort
cohortSchema.virtual('associatedGroups', {
  ref: 'Group',
  localField: '_id',
  foreignField: 'associatedCohort',
});

// set virtuals to be included in toObject and toJSON outputs
cohortSchema.set('toObject', { virtuals: true });
cohortSchema.set('toJSON', { virtuals: true });

// export cohort model
export default mongoose.model('Cohort', cohortSchema);
