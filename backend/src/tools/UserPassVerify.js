class UserPassVerify {
  login(loginPass, DBPass) {
    if (loginPass === DBPass) {
      return true;
    }
    return false;
  }
}

module.exports = new UserPassVerify();
