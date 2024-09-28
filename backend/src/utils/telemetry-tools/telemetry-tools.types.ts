import type { Logger } from '@aws-lambda-powertools/logger';
import type { Metrics } from '@aws-lambda-powertools/metrics';
import type { Tracer } from '@aws-lambda-powertools/tracer';

export interface TelemetryTools {
  logger: Logger;
  metrics: Metrics;
  tracer: Tracer;
}