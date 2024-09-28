import middy from "@middy/core";
import * as process from "node:process";

import {
  createNeoDriver,
  getTelemetryTools,
  telemetryMiddleware,
} from "@lambda-utils/index";

import {
  createNeoDriver,
  getTelemetryTools,
  telemetryMiddleware,
} from "@lambda-utils/index";

import { createNeo4jUser } from "./functions/create-neo4j-user";

const telemetryTools = getTelemetryTools(
  "create-user-in-neo4j",
  "hack-yeah/user"
);

const lambdaHandler = async (event: any, context: any) => {
  telemetryTools.logger.info("Started creating user in neo4j", event);

  const driver = await createNeoDriver(process.env.SECRET_ARN);

  await createNeo4jUser(telemetryTools, driver, event);

  telemetryTools.logger.info("Finished creating user in neo4j", event);

  context.done(null, event);
};

export const handler = middy(lambdaHandler).use(
  telemetryMiddleware(telemetryTools)
);
