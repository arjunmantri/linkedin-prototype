var config = require('../models/auth');
var ejs = require("ejs");
var async = require("async");
var	UserModel = require('../models/UserModel');
var CompanyModel = require('../models/CompanyModel');
var JobPosts = require('../models/JobPostsModel');

exports.getProfile = function(req,res){
	
	UserModel.findOne({"UserId": req.user.userId},function(err,response){
		if(err)
			console.log(err);
		console.log("response is "+ response);
		res.json(response);
	}); 
};

exports.viewProfile = function(req,res){
	
    res.render('editprofile', { message : req.user });

};
exports.postProfile = function(req,response){
	
    var query = {"UserId": req.user.userId};
    var update = { $addToSet : { 'Posts' : req.body.FirstName + " " + req.body.LastName + " updated profile."}};
    
	console.log("*************** user id "+req.user.userId);
    UserModel.findOne({"UserId": req.user.userId}, function(err,um){
		if(err)
			console.log(err);
		console.log("response is "+ response);
		um.FirstName =req.body.FirstName;
	    um.LastName =req.body.LastName;//req.body.LastName;
		um.Address = req.body.Address;
		um.Country = req.body.Country;
		um.ZipCode = req.body.ZipCode;
		um.Bio = req.body.Bio;
		um.Company.Name = req.body.CompanyName;
		um.Company.Title = req.body.CompanyTitle;
		um.Company.StartDate = req.body.CompanyStartDate;
		um.Company.EndDate = req.body.CompanyEndDate;
		um.Company.Description = req.body.CompanyDescription;
		um.Education.School = req.body.EducationSchool;
		um.Education.Degree = req.body.EducationDegree;
		um.Education.Field = req.body.EducationField;
		um.Education.Level = req.body.Level;
		um.Education.Grade = req.body.Grade;
		um.Education.StartDate = req.body.EducationStartDate;
		um.Education.EndDate = req.body.EducationEndDate;
        
       // um.Posts = req.body.FirstName + " " + req.body.LastName + " updated profile";
        
		um.save(function(err){
			if(err)
				throw err;
			
            console.log("user profile added : " + um);
                
            UserModel.update(query, update, function(err, data){
                if(err)
                    console.log("Error updating profile update status");
                
            })
            
		});
		//res.json(response);
	});
    console.log("********************************** in post profile");
    		
	response.end("Profile Saved!!");
		
};


exports.getUserFollowing = function(req,res){
	var users = [];

   // var users = { firstname : String, lastname: String, email: String, posts:[]};
    
	UserModel.findOne({"UserId" : req.user.userId}, function(err, response) {
		if (err)
			console.log(err);
		var userFollowedArray = response.UserFollowed;
		async.each(userFollowedArray,
				function(id,callback){
				UserModel.findOne({"UserId" : id},'UserId FirstName LastName Posts', function(err, response) {
					users.push(response);
					callback();
				});
		},
		function(err){
			res.json(users);
		}
	);
	});
}

exports.getCompanyFollowing = function(req,res){
	
	var companies = [];
	UserModel.findOne({"UserId" : req.user.userId}, function(err, response) {
		if (err)
			console.log(err);
		var companyFollowedArray = response.CompanyFollowed;
		async.each(companyFollowedArray,
				function(id,callback){
					CompanyModel.findOne({"CompanyId" : id},'CompanyId CompanyName', function(err, response) {
					companies.push(response);
					callback();
					});
				},
				function(err){
					res.json(companies);
				}
				);
			});
}

exports.getJobPosts = function(req,res){
	var posts = [];
	var postlist = [];
	var postArray = [];
	UserModel.findOne({"UserId" : req.user.userId}, function(err, response) {
		if (err)
			console.log(err);
		var companyFollowedArray = response.CompanyFollowed;
		if(companyFollowedArray!=null){
			async.each(companyFollowedArray,
				function(id,callback){
					CompanyModel.findOne({"CompanyId" : id}, function(err, resp) {
						if(resp!=null){
							if(resp.JobPosts!=null){
								postArray.push(resp.JobPosts);
							callback();
							}
						}
					});				
				},
				function(err){
					var str = postArray.toString();
					var arr =str.split(',')
					if(arr!=null){
					async.each(arr,
							function(pid,back){
								JobPosts.findOne({"_id":pid},'CompanyName CompanyId JobName JobDescription',function(err,response){
									posts.push(response);
									back();
								});
					},function(err){
						res.json(posts);
						
					});
					}
				});
			  }else{
				 
			  }
			});
};

exports.getUsers=function(req,res){
	console.log("Search key "+req.params.searchKey);
	UserModel.find({"FirstName":req.params.searchKey},function(err,response){
		
		res.json(response);
	});
	
}


exports.updateUserStatus = function(req, res)
{
    
    console.log("Status :"  + req.body.status);
   
    var query = {"UserId" : req.user.userId};
    var update  = { $addToSet : { 'Posts' : req.body.status } };
    
    UserModel.update(query, update, function(err, data){
        
        if(err)
            console.log("Update error: " + err);
        
        console.log("Updated " + JSON.stringify(data));
        res.json({message : JSON.stringify(data)});
    });
    
    
 /*   UserModel.findOne({"UserId" : req.user.userId}, function(err, user){
        
        console.log(JSON.stringify(user));
        
        if(err)
            console.log("User not found error " + err);
        
        
        
         user.Posts.push({status : req.body.status});
        
        if(user.Posts === undefined)
        {
            var Posts = {status : req.body.status};
           
            user.Posts = Posts;     
        }
        
        else{
            user.Posts.push({status : req.body.status});
        }
        
        user.save(function(err, response){
            
            if(err)
                console.log("Status post error: " + err);
            
            console.log(response);
            res.json({message : JSON.stringify(response)});
        });
        
    });*/
}


exports.follow=function(req,res){
		UserModel.findOne({"UserId":req.user.userId},function(err,response){
			//console.log("************************ +" +req.body.EmailId);
			var array = response.UserFollowed
			//var id = Number(req.body.EmailId)
			//array.push(req.body.Id);
			//response.UserFollowed = array;
            response.UserFollowed.addToSet(req.body.Id);
			response.save(function(err){
				if(err)
					throw err;
				console.log("user followed updated : " + response);
			});
			res.json("success");
	
		})
	
}
