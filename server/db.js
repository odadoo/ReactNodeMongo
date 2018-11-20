var mongo = require("mongoose");
var db = mongo.connect("mongodb://localhost/ReactApp", (err, response) => {
  if(err){
    console.log( err);
  } else {
    console.log('MongoDB Connected');
  }
});

module.exports = db;