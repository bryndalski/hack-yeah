import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
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
} from 'aws-cdk-lib/aws-cognito';
import { User } from '../../src/backend/src/user-module/entities/user';
import { SystemRoles } from '../../src/backend/src/common/auth/system-roles/system-roles';


export class CognitoStack extends Stack {
  cognitoUserPool: UserPool;
  cognitoUserPoolClient: UserPoolClient;
  // cognitoUserPoolDomain: UserPoolDomain;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(
      scope,
      id,
      props,
    );

    this._createUserPool()
  }


  private _createUserPool() {
    const cognitoUserPool = new UserPool(this, 'HackYeahUsers', {
      userPoolName: 'HackYeahUsers',
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
        [User.CognitoCustomAttributes.userId]: new StringAttribute({ mutable: false }),
      },
      removalPolicy: RemovalPolicy.DESTROY,

    });


    const domains = ['http://localhost:3000'];
    const userPoolClient = new UserPoolClient(this, 'HackYeahUserPoolClient',
      {
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

        supportedIdentityProviders: [
          UserPoolClientIdentityProvider.COGNITO,
        ],
        preventUserExistenceErrors: true,
        userPool:cognitoUserPool,
      });

    const identityPool = new CfnIdentityPool(this, 'IdentityPool', {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: cognitoUserPool.userPoolProviderName,
        },
      ],
    });


    // const userPoolDomainPrefix = `hackyeah-${this.stackName.toLowerCase()}`;
    //
    // const userPoolDomain = new UserPoolDomain(
    //   this,
    //   "CognitoUserPoolDomain",
    //   {
    //     cognitoDomain: {
    //       domainPrefix: userPoolDomainPrefix,
    //     },
    //     userPool: cognitoUserPool,
    //   }
    // );

    this._createCognitoGroups(cognitoUserPool)

    this.cognitoUserPool = cognitoUserPool
    this.cognitoUserPoolClient = userPoolClient;
    // this.cognitoUserPoolDomain = userPoolDomain;
  }

  private _createCognitoGroups(userPool: UserPool) {
    Object.values(SystemRoles.AllSystemRoles).forEach((value) => {
      new CfnUserPoolGroup(this, value, {
        groupName: value,
        userPoolId: userPool.userPoolId,
      });
    });
  }
}