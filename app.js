//1. These two statements I did first 
var express = require("express");
var app = express();

//4. I then added this to see my ejs pages at the routes below. 
app.set("view engine", "ejs");

//3. This is for the landing page. 
app.get("/", function(req,res) {
  res.render("landing");
});

app.get("/campgrounds", function(req,res) {
  //This array is only temporary
  var campgrounds = [
    {name: "Hampshire Hills", image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1436285122087-89584a1d9398?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200"},
    {name: "Cuddy Creek", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200"}
  ]
  //The object, {}, is needed to pass in the campgrounds arrary. 
  res.render("campgrounds", {campgrounds: campgrounds});
});


//2. I then added this to get the server running.
app.listen(3000, function() {
  console.log("Head to LocalHost 3000!");
});

