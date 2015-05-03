var jobrecommendation = require('../models/jobRecommendationModel');
var	UserModel = require('../models/UserModel');
//var JobPosts = require('../models/')
exports.getJobRecommendation = function(req, res){
	var user = [];
		//console.log("******************************** User id "+req.user.serId);
		jobrecommendation.findOne({"UserId" : 1},function(err, data){
			
			if(err)
				console.log("ERROR " + err);
			res.json(data);
			/*if(response.JobPosts!=null){
			var jobRecommendArray = response.JobPosts;
			
			async.each(jobRecommendArray,
						
					function(email,callback){
				jobrecommendation.findOne({"UserId" : email}, function(err, response) {
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
		});*/
})
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