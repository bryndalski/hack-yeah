import { Logger } from "@aws-lambda-powertools/logger";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { logMetrics } from "@aws-lambda-powertools/metrics/middleware";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware";

import { TelemetryTools } from "./telemetry-tools.types";

/**
 * Get instances of all the _telemetry tools we use.
 * @param serviceName Service name of Telemetry
 * @param namespace Namespace of Telemetry
 */
export const getTelemetryTools = (
  serviceName: string,
  namespace: string
): TelemetryTools => {
  const tracer = new Tracer({ serviceName });
  const logger = new Logger({ serviceName });
  const metrics = new Metrics({ serviceName, namespace });

  return { tracer, logger, metrics };
};

/**
 * Returns an array of the default Middy middlewares that we use.
 */
export const telemetryMiddleware = ({
  logger,
  tracer,
  metrics,
}: TelemetryTools) => {
  return [
    captureLambdaHandler(tracer),
    injectLambdaContext(logger),
    logMetrics(metrics, { captureColdStartMetric: true }),
  ];
};
