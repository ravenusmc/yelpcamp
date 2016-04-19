//1. These two statements I did first 
var express = require("express");
var app = express();
var bodyParser = require("body-Parser");
//npm install mongoose --save for below statement
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

//SCHEMA SETUP 
var campgroundSchema = new mongoose.Schema({
  name: String, 
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
  name: "Cuddy Creek",
  image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200",
  description: "This is a super nice campground but no bathrooms, water or other benefits of modern life."
});

//Used this array before I set up the mongodb.
// var campgrounds = [
//     {name: "Hampshire Hills", image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1436285122087-89584a1d9398?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200"},
//     {name: "Cuddy Creek", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200"}
//   ];

app.use(bodyParser.urlencoded({extended: true}));
//4. I then added this to see my ejs pages at the routes below. 
app.set("view engine", "ejs");



//3. This is for the landing page. 
app.get("/", function(req,res) {
  res.render("landing");
});

app.get("/campgrounds", function(req,res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });

  //The object, {}, is needed to pass in the campgrounds arrary. 
  //res.render("campgrounds", {campgrounds: campgrounds});
});

//5 This is for added new campgrounds-notice the post.
//Be sure to do npm install body-parser --save, look at var bodyParser above
app.post("/campgrounds", function(req,res){

  //Below line to test after you have it set up. 
  //res.send("Submitted!");

  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image; 
  var newCampground = {name:name, image: image};

  //creating a new campground and save to DB 
  Campground.create(newCampground, function(err, newly) {
    if(err){
      console.log(err);
    }else {
      res.redirect("/campgrounds");
    }
  });
  //Below line is only for the array.
  //campgrounds.push(newCampground)

  //reditect back to campgrounds page
  //res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res) {
  res.render("new.ejs");
});

//show request, the new route needs to be first.
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided id, show campground
  res.send("This will be the show page one day!");
});


//2. I then added this to get the server running.
app.listen(3000, function() {
  console.log("Head to LocalHost 3000!");
});
































