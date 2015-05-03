var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var textSearch = require('mongoose-text-search');

var jobPost = new Schema({
			_id: String,
			CompanyId:String,
			CompanyName:String,
			JobName:String,
			KeyWords:[String],
			SkillSet:String,
	      	JobDescription:String,
	      	JobLocation : String,
	    	PostDate:{type:Date},
	    	ExpiryDate:{type:Date}
			});

jobPost.plugin(textSearch);
jobPost.index({JobDescription :'text'});

module.exports = mongoose.model("JobPosts",jobPost);