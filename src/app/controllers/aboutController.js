class AboutController {
  //GET edit
  about(req, res) {
    res.render("about");
  }
}

module.exports = new AboutController();
