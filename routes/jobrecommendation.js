var jobrecommendation = require('../models/jobRecommendationModel');

exports.getJobRecommendation = function(req, res){
		
		//console.log("******************************** User id "+req.user.serId);
		jobrecommendation.findOne({"UserId" : 1},function(err, data){
			
			if(err)
				console.log("ERROR " + err);
			res.json(data);
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