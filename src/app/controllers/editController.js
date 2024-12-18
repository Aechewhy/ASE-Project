class EditController {
  //GET edit
  edit(req, res) {
    res.render("edit");
  }

  show(req, res) {
    res.send("Edit Controller");
  }
}

module.exports = new EditController();
