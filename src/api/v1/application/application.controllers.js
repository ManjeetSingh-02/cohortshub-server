// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIErrorResponse, APISuccessResponse } from '../../response.api.js';
import { Application } from '../../../models/index.js';

// @controller POST /
export const createApplication = asyncHandler(async (req, res) => {});

// @controller PATCH /accept
export const acceptApplication = asyncHandler(async (req, res) => {});

// @controller PATCH /reject
export const rejectApplication = asyncHandler(async (req, res) => {});

// @controller PATCH /withdraw
export const withdrawApplication = asyncHandler(async (req, res) => {});
