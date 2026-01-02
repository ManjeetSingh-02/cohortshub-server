/**
 * GET /healthcheck
 * @operationId healthCheck
 * @summary Check Server Health
 * @tags HealthCheck - Health Check Endpoints
 * @security
 * @description Endpoint to check the status of the server.
 * @return {APISuccessResponse} 200 - Successful response
 * @example response - 200 - Successful health check response
 * {
 * "success": true,
 * "statusCode": 200,
 * "response": { "message": "Server is Running" }
 * }
 */