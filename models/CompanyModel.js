var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var JobPostsSchema = require("./JobPostsSchema");

var company = new Schema({
	_id:String,
	UserId:Number,
	CompanyName:String,
	Address:String,
	Country:String,
	Zip:String,
	Overview:String,
	Url:String,
	Founded:String,
	Numoffollowers: Number,
	JobPosts:[String],
    Status: []
});



module.exports = mongoose.model("CompanyProfile",company);

