#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoStack, HackYeahVpcStack } from '../lib';
import { CognitoLambdaStack } from '../lib/lambda-stack/cognito-lambdas/cognito-lambda.stack';

const app = new cdk.App();


const { vpc } = new HackYeahVpcStack(app, 'HackYeahVpcStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const { cognitoUserPool } = new CognitoStack(app, 'HackYeahCognitoStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});


new CognitoLambdaStack(app, 'HackYeahCognitoLambdaStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  vpc,
  cognitoUserPool,
});

