// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

// Starting our Express app
// =============================================================
var PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

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
// var User = require("./userModel.js");

// Routes
// =============================================================
// Main page
app.get("/", function(req, res) {
    res.render("index");
  });
// Scrape + add data to db https://www.nytimes.com/
// GET all articles

app.get("/saved", function(req, res){
    res.render("saved")
})

// Seeing if Port is listening
// =============================================================
app.listen(PORT, function() {
    console.log('http://localhost' + PORT);
});
