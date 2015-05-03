var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserRecommendation = new Schema({
	Email:String,
	Users:[{type:String}]
});

module.exports = mongoose.model("UserRecommendation",UserRecommendation);
