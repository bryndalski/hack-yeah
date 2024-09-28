import middy = require('middy');

import { getTelemetryTools, telemetryMiddleware } from '@lambda-utils/index';

const telemetryTools = getTelemetryTools(
  'create-user-in-neo4j',
  'hack-yeah/user',
);


const lambdaHandler = async (event: any) => {

  telemetryTools.logger.info('Started creating user in neo4j');

  return {
    status: 200,
  };

};


export const handler = middy(lambdaHandler).use(telemetryMiddleware(telemetryTools));