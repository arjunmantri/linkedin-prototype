var jobrecommendation = require('../models/jobRecommendationModel');
var	UserModel = require('../models/UserModel');
exports.getJobRecommendation = function(req, res){
	var user = [];
		//console.log("******************************** User id "+req.user.serId);
		jobrecommendation.findOne({"UserId" : 1},function(err, data){
			
			if(err)
				console.log("ERROR " + err);
			
			var userRecommendArray = response.JobPosts;
			if(companyFollowedArray!=null){	
			async.each(userRecommendArray,
						
					function(email,callback){
						UserModel.findOne({"Email" : email}, function(err, response) {
						users.push(response);
						callback();
						});
					},
					function(err){
						res.json(users);
					}
					)}
					else{
						res.json("empty array");
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