//1. These two statements I did first 
var express = require("express");
var app = express();
var bodyParser = require("body-Parser");
//npm install mongoose --save for below statement
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

//routes
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
//4. I then added this to see my ejs pages at the routes below. 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//Seed the Databse
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Authentication method
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
  res.locals.currentUser = req.user;
  next();
});

//Route Refractoring 
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

//2. I then added this to get the server running.
app.listen(3000, function() {
  console.log("Head to LocalHost 3000!");
});
































