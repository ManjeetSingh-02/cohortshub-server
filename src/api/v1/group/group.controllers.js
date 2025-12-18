// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIResponse } from '../../response.api.js';

// @controller GET /
export const getCohortDetailsandGroups = asyncHandler(async (req, res) => {
  // populate group info for response
  const populatedCohortData = await req.cohort.populate([
    {
      path: 'createdBy',
      select: '-_id username',
    },
    {
      path: 'associatedGroups',
      select:
        '_id groupName groupDescription groupMembers maximumMembers roleRequirements createdBy',
      populate: {
        path: 'createdBy',
        select: '-_id username',
      },
    },
  ]);

  // send success status to user
  return res.status(200).json(
    new APIResponse(200, {
      message: 'Cohort details and associated groups fetched successfully',
      data: {
        cohortID: req.cohort._id,
        cohortName: req.cohort.cohortName,
        cohortDescription: req.cohort.cohortDescription,
        createdBy: populatedCohortData.createdBy,
        associatedGroups: populatedCohortData.associatedGroups,
      },
    })
  );
});
