class SearchController {
  //GET edit
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SearchController();
