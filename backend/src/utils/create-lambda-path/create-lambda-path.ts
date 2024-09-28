import * as path from 'path';

export const createLambdaPath = (...pathSegments: string[]): string => {
  return path.join(__dirname, "../src/lambdas", ...pathSegments, "index.ts");
}