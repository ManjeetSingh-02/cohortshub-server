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

// pre-hook to create temporary property to check if document is new
cohortSchema.pre('save', function () {
  this.$wasNew = this.isNew;
});

// post-hook to add system admin email to allowedUserEmails
cohortSchema.post('save', async function (doc) {
  if (doc.$wasNew) {
    // fetch all system admin from db
    const systemAdmin = await User.findOne({ role: USER_ROLES.SYSTEM_ADMIN }).select('email');

    // update cohort allowedUserEmails to include system admin email
    await Cohort.updateOne(
      { _id: doc._id },
      { $addToSet: { allowedUserEmails: systemAdmin.email } }
    );

    // delete the temporary property
    delete doc.$wasNew;
  }
});

// export cohort model
export default mongoose.model('Cohort', cohortSchema);
