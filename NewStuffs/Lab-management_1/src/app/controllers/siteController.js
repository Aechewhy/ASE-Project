class SiteController {
  //GET edit
  home(req, res) {
    res.render("home");
  }
}

module.exports = new SiteController();
