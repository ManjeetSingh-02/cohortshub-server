// import local modules
import { asyncHandler } from '../async-handler.js';

// function to check if application exists in the group
export const doesApplicationExistInGroup = asyncHandler();

// function to check if user already has a pending application to any group
export const userAlreadyHasAPendingApplication = asyncHandler();

// function to check if user can withdraw application
export const canUserWithdrawApplication = asyncHandler();
