var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//3. This is for the landing page. 
router.get("/", function(req,res) {
  res.render("landing");
});

// AUTH ROUTES 
//Show registration form
router.get("/register", function(req,res){
  res.render("register");
})

//Handle sign up logic
router.post("/register", function(req,res){
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

//Login form-show it
router.get("/login", function(req,res){
  res.render("login");
});

//Login route
router.post("/login", passport.authenticate("local", 
  {
      successRedirect: "/campgrounds", 
      failureRedirect: "/login" 
  }), function(req,res){
});

//Log Out Route
router.get("/logout", function(req,res){
  req.logout();
  res.redirect("/campgrounds");
});

//Middleware-Used for forcing people to log in! 
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;





























