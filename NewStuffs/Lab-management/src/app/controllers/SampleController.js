class SampleController {
    index(req, res) {
        res.render("news");
    }
    show(req, res) {
        res.send("");
    }
}
module.exports = new SampleController();
