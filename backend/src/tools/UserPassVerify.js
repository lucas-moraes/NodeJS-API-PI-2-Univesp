class UserPassVerify {
  constructor(loginPass, DBPass) {
    this.loginPass = loginPass;
    this.DBPass = DBPass;
  }

  login() {
    if (this.loginPass === this.DBPass) {
      return true;
    }
    return false;
  }
}

module.exports = new UserPassVerify();
