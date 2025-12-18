// import local modules
import { USER_ROLES } from '../utils/constants.js';
import { Cohort, User } from './index.js';

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
      maxLength: 50,
    },
    cohortDescription: {
      type: String,
      required: true,
      trim: true,
      minLength: 20,
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
    associatedGroups: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Group',
        },
      ],
      default: [],
    },
    auditLogs: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'AuditLog',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// post-hook to add all system admins email to allowedUserEmails and user
cohortSchema.post('save', async function (doc) {
  if (doc.$wasNew) {
    // fetch all system admins from db
    const systemAdmins = await User.find({ role: USER_ROLES.SYSTEM_ADMIN }).select('email');

    // extract emails
    const adminEmails = systemAdmins.map(admin => admin.email);

    // update cohort allowedUserEmails
    await Cohort.updateOne(
      { _id: doc._id },
      { $addToSet: { allowedUserEmails: { $each: adminEmails } } }
    );

    // update system admins enrolledCohorts
    await User.updateMany(
      { role: USER_ROLES.SYSTEM_ADMIN },
      { $addToSet: { enrolledCohorts: doc._id } }
    );
  }
});

// export cohort model
export default mongoose.model('Cohort', cohortSchema);
