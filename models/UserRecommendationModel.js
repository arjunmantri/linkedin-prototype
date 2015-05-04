var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserRecommendation = new Schema({
	_id:String,
	Email:[{type:String}]
});

module.exports = mongoose.model("UserRecommendation",UserRecommendation);
