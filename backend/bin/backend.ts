#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoStack, HackYeahVpcStack } from '../lib';

const app = new cdk.App();


new HackYeahVpcStack(app, 'HackYeahVpcStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
})

new CognitoStack(app, 'HackYeahCognitoStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
})
