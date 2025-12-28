// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIErrorResponse, APISuccessResponse } from '../../response.api.js';
import { Application, Group } from '../../../models/index.js';

// @controller POST /
export const createApplication = asyncHandler(async (req, res) => {
  // fetch group from db
  const existingGroup = await Group.findById(req.group.id)
    .select('createdBy maximumMembersCount groupMembersCount roleRequirements')
    .lean();

  // check if user is trying to apply to their own group
  if (existingGroup.createdBy.equals(req.user.id))
    throw new APIErrorResponse(400, {
      type: 'Create Application Error',
      message: 'Group creators cannot apply to their own groups',
    });

  // check if group is already full
  if (existingGroup.groupMembersCount === existingGroup.maximumMembersCount)
    throw new APIErrorResponse(400, {
      type: 'Create Application Error',
      message: 'Group already has maximum number of members',
    });

  // create new application
  const newApplication = await Application.create({
    cohortID: req.cohort.id,
    groupID: req.group.id,
    applicantDetails: {
      applicantID: req.user.id,
      applicantPitch: req.body.applicantPitch,
      applicantResources: req.body.applicantResources,
      applicantSkills: req.body.applicantSkills,
    },
  });
  if (!newApplication)
    throw new APIErrorResponse(500, {
      type: 'Create Application Error',
      message: 'Something went wrong while applying to the group',
    });

  // send success status to user
  return res.status(201).json(
    new APISuccessResponse(201, {
      message: 'Applied to group successfully',
    })
  );
});

// @controller PATCH /accept
export const acceptApplication = asyncHandler(async (req, res) => {});

// @controller PATCH /reject
export const rejectApplication = asyncHandler(async (req, res) => {});

// @controller PATCH /withdraw
export const withdrawApplication = asyncHandler(async (req, res) => {});
