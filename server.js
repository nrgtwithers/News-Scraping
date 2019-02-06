// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
// morgan & body parser?


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

// Schema 
// =============================================================
// var db = require("./models")

// Routes
// =============================================================

// Seeing if Port is listening
// =============================================================
app.listen(PORT, function() {
    console.log('http://localhost' + PORT);
});
