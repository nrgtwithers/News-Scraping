// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// Starting our Express app
// =============================================================
const PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Sets up Handlebars
// =============================================================
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose Database
// =============================================================
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// mongoose.connect("mongodb://localhost/articlesdb", { useNewUrlParser: true });


// Schema 
// =============================================================
const Article = require("./models/articles");
const Note = require("./models/notes");

axios.get("https://medium.com/topic/technology").then(function (response) {

    var $ = cheerio.load(response.data);
    var results = [];

    $("h3").each(function (i, element) {
        var title = $(element).text();
        var summary = $(element).children("p").text();
        var link = $(element).find("a").attr("href");


        results.push({
            title: title,
            summary: summary,
            link: link
        });
    });
    console.log(results);
});

// Routes
// =============================================================
// Main page
app.get("/", (req, res) => {
    res.render("index");
});

// Scrape + add data to db https://medium.com/topic/technology
app.get("/scrape", (req, res) => {
    axios.get("https://medium.com/topic/technology").then(function (response) {

        var $ = cheerio.load(response.data);
        var results = [];

        $("h3").each(function (i, element) {
            var title = $(element).text();
            var link = $(element).find("a").attr("href");


            results.push({
                title: title,
                link: link
            });
        });
        console.log(results);
    })
});

// GET all saved articles
app.get("/saved", function (req, res) {
    res.render("saved")
})

// Seeing if Port is listening
// =============================================================
app.listen(PORT, function () {
    console.log('http://localhost' + PORT);
});
