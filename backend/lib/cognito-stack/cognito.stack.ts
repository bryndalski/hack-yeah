import { SystemRoles } from "@backend/common/auth/system-roles/system-roles";
import { User } from "@backend/user-module/entities/user";

import { createLambdaPath } from "@lambda-utils/create-lambda-path/create-lambda-path";

import {
  AccountRecovery,
  CfnIdentityPool,
  CfnUserPoolGroup,
  OAuthScope,
  StringAttribute,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  UserPoolEmail,
  UserPoolOperation,
} from "aws-cdk-lib/aws-cognito";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

type CognitoStackProps = StackProps & {
  vpc: Vpc;
};

export class CognitoStack extends Stack {
  cognitoUserPool: UserPool;
  cognitoUserPoolClient: UserPoolClient;

  constructor(
    scope: Construct,
    id: string,
    { vpc, ...props }: CognitoStackProps
  ) {
    super(scope, id, props);

    this._createUserPool(vpc);
  }

  private _createUserPool(vpc: Vpc) {
    const cognitoUserPool = new UserPool(this, "HackYeahUsers", {
      userPoolName: "HackYeahUsers",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireSymbols: true,
        requireUppercase: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      email: UserPoolEmail.withCognito(),
      standardAttributes: {
        fullname: {
          required: true,
          mutable: true,
        },
        email: {
          required: true,
          mutable: false,
        },
        gender: {
          required: true,
          mutable: true,
        },
        birthdate: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        [User.CognitoCustomAttributes.userId]: new StringAttribute({
          mutable: false,
        }),
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const domains = ["http://localhost:3000"];
    const userPoolClient = new UserPoolClient(this, "HackYeahUserPoolClient", {
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      disableOAuth: false,
      oAuth: {
        callbackUrls: domains.map((domain) => `${domain}/sign-in/`),
        flows: {
          authorizationCodeGrant: true,
        },
        logoutUrls: domains.map((domain) => `${domain}/sign-out/`),
        scopes: [
          OAuthScope.EMAIL,
          OAuthScope.PHONE,
          OAuthScope.PROFILE,
          OAuthScope.OPENID,
        ],
      },

      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      preventUserExistenceErrors: true,
      userPool: cognitoUserPool,
    });

    const identityPool = new CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: cognitoUserPool.userPoolProviderName,
        },
      ],
    });

    cognitoUserPool.addTrigger(
      UserPoolOperation.PRE_SIGN_UP,
      this._createFromCognitoToNeo4jLambda(vpc)
    );

    this._createCognitoGroups(cognitoUserPool);

    this.cognitoUserPool = cognitoUserPool;
    this.cognitoUserPoolClient = userPoolClient;
  }

  private _createCognitoGroups(userPool: UserPool) {
    Object.values(SystemRoles.AllSystemRoles).forEach((value) => {
      new CfnUserPoolGroup(this, value, {
        groupName: value,
        userPoolId: userPool.userPoolId,
      });
    });
  }

  private _createFromCognitoToNeo4jLambda(vpc: Vpc) {
    const secret = Secret.fromSecretNameV2(
      this,
      "lambdaIndexerImportedSecret",
      "NEO4J_CONNECTION_SECRET"
    );

    const createUserInNeo4j = new NodejsFunction(
      this,
      "CreateUserInNeo4jLambda",
      {
        entry: createLambdaPath("create-user-in-neo4j"),
        handler: "handler",
        vpc,
        environment: {
          SECRET_ARN: secret.secretArn,
        },
      }
    );

    secret.grantRead(createUserInNeo4j);

    return createUserInNeo4j;
  }
}
