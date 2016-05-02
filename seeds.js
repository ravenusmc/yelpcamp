var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
  {
    name: "Clouds Rest", 
    image: "https://images.unsplash.com/reserve/UJO0jYLtRte4qpyA37Xu_9X6A7388.jpg?crop=entropy&dpr=2&fit=crop&fm=jpg&h=575&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200",
    description: "A wonderful place to spend the night!"
  },
  {
    name: "Canyon Floor", 
    image: "https://images.unsplash.com/photo-1457368406279-ec1ecb478381?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=d5905a4e8e077df61c6894b9a193abd7",
    description: "A wonderful place to spend the night!"
  },
  {
    name: "Axe Camp", 
    image: "https://images.unsplash.com/photo-1444228250525-3d441b642d12?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=2c9fe537caea664ec72293530d940c91",
    description: "A wonderful place camp and work out!!"
  }
]

function seedDB() {
  //Remove all campgrounds
    Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
      console.log("removed campgrounds");
      //add some campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          }else {
            console.log("Added a campground");
            //create a comment
            Comment.create(
              {
                text: "This is place is spooky!",
                author: "Homer"
              }, function(err, comment){
                if(err){
                  console.log(err); 
                }else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Created new comment");
                }
              });
          }
        });
      });
  });
  //added a few comments
}

module.exports = seedDB;
































