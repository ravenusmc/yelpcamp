var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", function(req,res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  });

  //The object, {}, is needed to pass in the campgrounds arrary. 
  //res.render("campgrounds", {campgrounds: campgrounds});
});

//5 This is for added new campgrounds-notice the post.
//Be sure to do npm install body-parser --save, look at var bodyParser above
router.post("/campgrounds", isLoggedIn, function(req,res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image; 
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name:name, image: image, description: desc, author:author};
  //creating a new campground and save to DB 
  Campground.create(newCampground, function(err, newly) {
    if(err){
      console.log(err);
    }else {
      res.redirect("/campgrounds");
    }
  });
});

router.get("/campgrounds/new", isLoggedIn, function(req,res) {
  res.render("campgrounds/new");
});

//show request, the new route needs to be first.
router.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided id, show campground
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
  req.params.id
  //res.send("This will be the show page one day!");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect("/login");
// }

module.exports = router;



































