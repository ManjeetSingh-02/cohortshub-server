// import local modules
import { MAX_GROUP_MEMBERS } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';

// schema for skill set
const skillSetSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    isMandatory: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

// schema for role requirement
const roleRequirementSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      trim: true,
    },
    skillSet: {
      type: [skillSetSchema],
      required: true,
    },
  },
  { _id: false }
);

// schema for group announcements
const announcementSchema = new mongoose.Schema(
  {
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
            lowercase: true,
          },
        },
      ],
      default: [],
    },
  },
  { _id: false, timestamps: true }
);

// schema for group
const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    groupDescription: {
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
    groupMembers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    maximumMembers: {
      type: Number,
      default: MAX_GROUP_MEMBERS,
    },
    roleRequirements: {
      type: [roleRequirementSchema],
      default: [],
    },
    groupAnnouncements: {
      type: [announcementSchema],
      default: [],
    },
    associatedCohort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
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

// create index on groupName for faster search
groupSchema.index({ groupName: 1, associatedCohort: 1 }, { unique: true });

// pre-hook to add the creator as the first member of the group
groupSchema.pre('save', function (next) {
  if (this.isNew) this.groupMembers.push(this.createdBy);
  next();
});

// export group model
export default mongoose.model('Group', groupSchema);
