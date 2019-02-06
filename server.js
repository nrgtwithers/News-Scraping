// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
// morgan & body parser?

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Starting our Express app
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up Handlebars
// =============================================================
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose Database
// =============================================================
mongoose.connect("mongodb://localhost/articlesdb", { useNewUrlParser: true });


// Schema 
// =============================================================
// var User = require("./userModel.js");
// var db = require("./models")

// Routes
// =============================================================
// Scrape + add data to db
// GET all articles

// Seeing if Port is listening
// =============================================================
app.listen(PORT, function() {
    console.log('http://localhost' + PORT);
});
