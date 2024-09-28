export class SystemRoles {

  static get Admin(){
    return "admin"
  }

  static get User(){
    return "user"
  }


  static get AllSystemRoles(){
    return [
      SystemRoles.Admin,
      SystemRoles.User
    ]
  }

}