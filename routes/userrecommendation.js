var UserRecommendationModel = require('../models/UserRecommendationModel');
var	UserModel = require('../models/UserModel');
exports.getUserRecommendation = function(req, res){
	var user = [];
		//console.log("******************************** User id "+req.user.serId);
	UserRecommendationModel.findOne({"Email" : "yashoswal990@gmail.com"},function(err, response){
			
			if(err)
				console.log("ERROR " + err);
			
			var userRecommendArray = response.Users;
			if(userRecommendArray!=null){	
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

exports.postUserRecommendation = function(req,res){
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