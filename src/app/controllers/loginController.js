class LoginController {
  //GET edit
  login(req, res) {
    res.render("login");
  }
}

module.exports = new LoginController();
