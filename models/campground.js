var mongoose = require("mongoose");

//SCHEMA SETUP 
var campgroundSchema = new mongoose.Schema({
  name: String, 
  image: String,
  description: String
});

//var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = mongoose.model("Campground", campgroundSchema);

//Example on how to create campground. 
// Campground.create({
//   name: "Cuddy Creek",
//   image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?crop=entropy&dpr=2&fit=crop&fm=jpg&h=625&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200",
//   description: "This is a super nice campground but no bathrooms, water or other benefits of modern life."
// });