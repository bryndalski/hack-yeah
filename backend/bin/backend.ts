#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";

import { CognitoStack, HackYeahVpcStack } from "../lib";

const app = new cdk.App();

const { vpc } = new HackYeahVpcStack(app, "HackYeahVpcStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const { cognitoUserPool } = new CognitoStack(app, "HackYeahCognitoStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  vpc,
});
