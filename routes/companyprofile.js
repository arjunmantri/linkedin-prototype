CompanyProfile = require('../models/CompanyModel');
JobPosts = require('../models/JobPostsModel');
var async = require('async');
var inspect = require('util').inspect;

exports.getCompanyProfile = function(req, res){

	var query = {'_id' : req.user.companyId};

	CompanyProfile.findOne(query, function(err, response){

		if(err)
		{
			console.log("Error response :" + err);
			res.json('error');
		}
		else
		{
			console.log("CompanyProfile GET response " + response);
			res.json({'CompanyInfo' : response});
		}
	});
}

exports.updateCompanyInfo = function(req, res){

	var query = {'_id' : req.user.companyId};

	CompanyProfile.findOne(query, function(err, response){

	if(err)
	{
		console.log("Error response :" + err);
		res.json('error');
	}
	else
	{
		console.log("Response : " + response);
		var update = { CompanyName : req.body.CompanyName, Address: req.body.Address, Country: req.body.Country, Zip: req.body.ZipCode, Overview: req.body.Overview, Url: req.body.Url, Founded: req.body.Founded };

			CompanyProfile.findOneAndUpdate(query, update, function(err, updateResponse){

				if(err)
					console.log("Error response :" + err);
					res.json("err");

				console.log("Company Update Response : " + updateResponse);
				res.json('success');
			});
		}

	});
}




exports.getEditProfile = function(req,res){
	ejs.renderFile('./views/companyeditprofile.ejs',function(err, result) {
		   // render on success
		   if (!err) {
		            res.end(result);
		   }
		   // render or error
		   else {
		            res.end('An error occurred');
		            console.log(err);
		   }
	   });
}

exports.jobPosts = function(req,res){

	jp = new JobPosts;
	var date = Date.now();
	var h = date.toString();
	console.log(h);
	jp._id = h;
	jp.JobName = req.body.JobTitle;
	jp.JobDescription = req.body.JobDescription;
	jp.PostDate = new Date;
	jp.ExpiryDate = new Date(req.body.ExpiryDate);
	jp.JobLocation = req.body.JobLocation;
	jp.SkillSet = req.body.SkillSet;
	
    jp.save(function(err){
		if(err)
			throw err;
		console.log("job post added : " + jp);
	});

	CompanyProfile.findOne({'_id': req.user.companyId},function(err,response){
		if (err)
			throw err;
        
        console.log("In company profile findone " + JSON.stringify(response));
        
		response.JobPosts.push(h);
		
        response.save(function(err){
			if(err)
				throw err;
			console.log(response);
		});
		
	});
	res.redirect('/company#/companyHome');	
};


//Get function for the Job Search:-
exports.getJobPosts = function(req,res){
	JobPosts.find({'SkillSet':req.params.key},function(err,response){
		if(err)
			throw err;
		res.json(response);
	})
};

exports.getOwnJobPosts = function(req,res){
	var posts = [];
	
	CompanyProfile.findOne({"_id" : req.user.companyId}, function(err, response) {
		if (err)
			console.log(err);
		
		var postids = response.JobPosts;
		
		if(postids!=null){
		
		async.each(postids,

				function(id,callback){
				
				JobPosts.findOne({"_id" : id}, function(err, response) {
					if(response!=null){
					posts.push(response);
					
					}
                    callback();
				});
		},
		
		function(err){

			console.log("POsts count " + posts.length);
			console.log("Company own job posts are "+ posts);
			res.json(posts);
		}
	);
	}
	});
}
 
exports.getProfile = function(req,res){
	
	console.log("REquestid " + JSON.stringify(req.user));
	
	CompanyProfile.findOne({'_id': req.user.companyId},function(err,response){
		

		if(err)
		{
			console.log("Error: " + err);
			res.redirect('/company#/companyHome');
		}

		console.log("company profile " + response);
		res.json(response);
	});
};

exports.updateStatus = function(req, res){

    console.log("New status "  + req.body.status);
    
    CompanyProfile.findOneAndUpdate({_id: req.user.companyId}, {$push: {status: req.body.status}}, {safe: true, upsert: true},
    
    function(err, model) {
        if(err)
            console.log(err);
        res.redirect('/company#/companyHome');
    }
);
        
}

exports.getStatus = function(req, res){
    
    CompanyProfile.find({_id: req.user.companyId}, function(err, response){
        
        if(err)
            console.log(err);
        
        console.log("Status response: " + response);
        res.json(response.status);
    });
}

exports.getCompanies = function(req, res){
		console.log("In company Search key "+req.params.searchKey);
		CompanyProfile.find({"CompanyName":req.params.searchKey},function(err,response){		
			if(err)
				console.log(err);
			console.log("****************** getCompanies "+response);
			res.json(response);
		});		
}

exports.getJobsSearch = function(req, res){
	console.log("In job Search key "+req.params.searchKey);
	JobPosts.textSearch(req.params.searchKey,function(err,response){
		var result = (inspect(response, { depth: null }));
		console.log(result);
		res.json(result);
	});		
}