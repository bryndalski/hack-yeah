export class User {
  static get CognitoCustomAttributes() {
    return {
      userId: "userId",
    };
  }

  static get properties() {
    return {
      id: "id",
      email: "email",
      fullname: "fullname",
      gender: "gender",
      birthdate: "birthdate",
    };
  }

  static fromCognitoRegisterEvent(event: any) {
    return;
  }
}
