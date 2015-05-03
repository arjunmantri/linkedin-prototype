var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jobrecommendation = new Schema({
	UserId:Number,
	JobPosts:[String]
});

module.exports = mongoose.model("jobrecommendation",jobrecommendation);
