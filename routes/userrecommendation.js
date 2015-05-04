var UserRecommendationModel = require('../models/UserRecommendationModel');
var	UserModel = require('../models/UserModel');
var async = require("async");
exports.getUserRecommendation = function(req, res){
	var users = [];
		
	UserRecommendationModel.findOne({"UserId" : req.user.userId},function(err, response){
			
			if(err)
				console.log("ERROR " + err);
			if(response!=null){
			var userRecommendArray = response.Email.split(",");
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
						res.json("");
					}
		});
}

exports.postUserRecommendation = function(req,res){
		console.log("req.body.UserId "+req.body.UserId);
		console.log("req.body.Email "+req.body.Email);
	 var query = {"UserId" : req.body.UserId}
	 var array= req.body.Email
	// for(var i = 0;i<array.length;i++ ){
		// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+array[i]);
	// }
	 var update = {$addToSet :{Email:{$each:array	}	}	};
	 /*array.forEach(addToSet)
	 function addToSet(element, index, array){
		 update={ $addToSet : { 'Email' : element } };
	 }
	 console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+ update);*/
	 var options  = {'upsert':true};  
	 UserRecommendationModel.findOneAndUpdate(query, {$pushAll:{Email:array}}, options,function(err, data){
		 res.json();
	 })
	/*var jr = new jobrecommendation;
	var jobarray = ['1','2','3'];
	jr.UserId = 2;
	jr.JobPosts=jobarray
	jr.save(function(err){
		if(err)
			throw err;
		console.log("job profile added : " + jr);
	});*/
	res.json({"posts":"added"});
}