var jobrecommendation = require('../models/jobRecommendationModel');
var	UserModel = require('../models/UserModel');
var JobPostsModel = require('../models/JobPostsModel');
var async = require("async");
//var JobPosts = require('../models/')
exports.getJobRecommendation = function(req, res){
	var jobs = [];
		//console.log("******************************** User id "+req.user.serId);
		jobrecommendation.findOne({"UserId" : 1},function(err, data){
			console.log("********************* " +data)
			if(err)
				console.log("ERROR " + err);
			if(data.JobPosts!=null){
			var jobRecommendArray = data.JobPosts;			
			async.each(jobRecommendArray,						
					function(id,callback){
				//console.log("################################# "+ id);
				JobPostsModel.findOne({"_id" : id}, function(err, response) {
					//console.log("^^^^^^^^^^^^^^^^^^^^^^ "+response)
						jobs.push(response);
						callback();
						});
					},
					function(err){
						//console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ "+jobs);
						res.json(jobs);
					}
					)}
					else{
						res.json("empty:array");
					}
		});
}


exports.postJobRecommendation = function(req,res){
	var jr = new jobrecommendation;
	var jobarray = ['1','2','3'];
	jr.UserId = 2;
	jr.JobPosts=jobarray
	jr.save(function(err){
		if(err)
			throw err;
		console.log("job profile added : " + jr);
	});
	res.json({"posts":"added"});
}