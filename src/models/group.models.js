// import local modules
import { MAX_GROUP_MEMBERS } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';

// schema for role requirement
const roleRequirementSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [
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
          isMandatory: {
            type: Boolean,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { _id: false }
);

// schema for group
const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 20,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    groupMembersCount: {
      type: Number,
      default: 1,
    },
    maximumMembersCount: {
      type: Number,
      default: MAX_GROUP_MEMBERS,
    },
    roleRequirements: {
      type: [roleRequirementSchema],
      default: [],
    },
    groupAnnouncement: {
      type: {
        announcementText: {
          type: String,
          required: true,
          trim: true,
          minLength: 10,
          maxLength: 500,
        },
        announcementResources: {
          type: [
            {
              resourceName: {
                type: String,
                required: true,
                trim: true,
              },
              resourceURL: {
                type: String,
                required: true,
                trim: true,
              },
            },
          ],
          default: [],
        },
      },
      default: null,
    },
    associatedCohort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create index on groupName for faster search
groupSchema.index({ groupName: 1, associatedCohort: 1 }, { unique: true });

// virtual field to get all groups associated with a cohort
groupSchema.virtual('currentGroupMembers', {
  ref: 'User',
  localField: '_id',
  foreignField: 'currentGroup',
});

// set virtuals to be included in toObject and toJSON outputs
groupSchema.set('toObject', { virtuals: true });
groupSchema.set('toJSON', { virtuals: true });

// export group model
export default mongoose.model('Group', groupSchema);
