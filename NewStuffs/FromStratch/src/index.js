const express = require("express");
const handlebars = require("express-handlebars"); // Correct import for express-handlebars
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as the template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
    })
); // Use .engine() with express-handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views")); // Set views directory
console.log(__dirname);
// Define a route
app.get("/", (req, res) => {
    res.render("home"); // Render 'home.handlebars' with data
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
