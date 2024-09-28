import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { createLambdaPath } from '@lambda-utils/index';


type CognitoLambdaStackProps = {
  vpc: Vpc
  cognitoUserPool: UserPool
} & StackProps

export class CognitoLambdaStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    {
      vpc,
      cognitoUserPool,
      ...props
    }: CognitoLambdaStackProps,
  ) {
    super(
      scope,
      id,
      props,
    );


    this._createFromCognitoToNeo4jLambda(
      cognitoUserPool,
      vpc,
    );

  }


  private _createFromCognitoToNeo4jLambda(
    cognitoUserPool: UserPool,
    vpc: Vpc,
  ) {

    const createUserInNeo4jLambda = new NodejsFunction(
      this,
      'CreateUserInNeo4jLambda',
      {
        entry:createLambdaPath("create-user-in-neo4j",),
        handler: 'handler',
        vpc,
        environment: {
          COGNITO_USER_POOL_ID: cognitoUserPool.userPoolId,
        },
      },
    );
  }
}