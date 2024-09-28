export type CreateCognitoUserEvent = {
  userPoolId: string;
  userName: string;
  request: {
    userAttributes: {
      fullname: string;
      email: string;
      gender: string;
      birthdate: string;
    };
  };
};
