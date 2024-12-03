class ShowTableController {
    index(req, res) {
        res.render("showTable");
    }
    show(req, res) {
        res.send("");
    }
}
module.exports = new ShowTableController();
