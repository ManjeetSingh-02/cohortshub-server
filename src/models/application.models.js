// import local modules
import { APPLICATION_STATUS, availableApplicationStatus } from '../utils/constants.js';

// import external modules
import mongoose from 'mongoose';

// function to check if reviewer feedback is required based on application status
function isReviewerFeedbackRequired() {
  // if application status is REJECTED, feedback is required
  return this.ownerDocument().applicationStatus === APPLICATION_STATUS.REJECTED;
}

// schema for applicant
const applicantSchema = new mongoose.Schema(
  {
    applicantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicantPitch: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 200,
    },
    applicantSkills: {
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
        },
      ],
      required: true,
    },
    applicantResources: {
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
      required: true,
    },
  },
  { _id: false }
);

// schema for applicationReviewer
const applicationReviewerSchema = new mongoose.Schema(
  {
    applicationReviewerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicationReviewerFeedback: {
      type: String,
      required: isReviewerFeedbackRequired,
      trim: true,
      minLength: 10,
      maxLength: 200,
    },
  },
  { _id: false }
);

// schema for application
const applicationSchema = new mongoose.Schema(
  {
    cohortID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    groupID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    applicantDetails: {
      type: applicantSchema,
      required: true,
    },
    applicationReviewerDetails: {
      type: applicationReviewerSchema,
      required: true,
    },
    applicationStatus: {
      type: String,
      enum: availableApplicationStatus,
      default: APPLICATION_STATUS.PENDING,
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

// export application model
export default mongoose.model('Application', applicationSchema);
