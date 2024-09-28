import * as path from "path";

export const createLambdaPath = (...pathSegments: string[]): string => {
  console.log(
    path.join(__dirname, "..", "..", "lambdas", ...pathSegments, "index.ts")
  );

  return path.join(
    __dirname,
    "..",
    "..",
    "lambdas",
    ...pathSegments,
    "index.ts"
  );
};
