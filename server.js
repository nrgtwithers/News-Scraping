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
mongoose.Promise = Promise;

// Schema 
// =============================================================
const Article = require("./models/articles");
const Note = require("./models/notes");

// Routes
// =============================================================
// Main page
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/getarticles", (req, res) => {
    Article.find({}, (err, result) => {
        res.json(result);
    })
})

// Scrape + add data to db https://medium.com/topic/technology
app.get("/scrape", (req, res) => {
    axios.get("https://medium.com/topic/technology").then(function (response) {

        var $ = cheerio.load(response.data);
        var results = [];

        $("div.dp.dq").each(function (i, element) {
            var title = $(element).children("h3").text();
            var summary = $(element).children("div.dv.d").children("p").children("a").text();
            var link = $(element).find("a").attr("href");
            if (title !== "" && summary !== "" && link !== "") {
                results.push({
                    title: title,
                    summary: summary,
                    link: link
                });
            }

        });
        console.log(results);
        Article.remove({}, (err) => {
            console.log(err)
        })
        Article.create(results, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        })

    });
});
// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", (req, res) => {
    Article.findOne({ "_id": req.params.id })
        .populate("note")
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(doc);
            }
        });
});

// route to all saved articles
app.get("/saved", (req, res)=> {
    res.render("saved")
})
// render user saved
app.get("/user-saved", (req, res) => {
    Article.find({ "_id": req.params.id }, { "saved": true})
    .then(function(Article) {
        res.json(Article);
      })
      .catch(function(err) {
        res.json(err);
      });
})


// Seeing if Port is listening
// =============================================================
app.listen(PORT, ()=> {
    console.log('http://localhost' + PORT);
});
