jobrecommendation = require('../models/jobRecommendationModel');

exports.getJobRecommendation = function(req, res){
		if (err)
			console.log(err);
		jobrecommendation.find({"UserId" : req.user.userId},function(){
			res.json(response);
		})
}