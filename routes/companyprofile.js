CompanyProfile = require('../models/CompanyModel');
JobPosts = require('../models/JobPostsModel');


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
	jp.JobName = req.body.JobName;
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

	CompanyProfile.findOne({'CompanyId':req.body.CompanyId},function(err,response){
		if (err)
			throw err;
		response.JobPosts.push(h);
		response.save(function(err){
			if(err)
				throw err;
			console.log(response);
		});
		
	});
	res.end();	
};


//Get function for the Job Search:-
exports.getJobPosts = function(req,res){

	jp = new JobPosts;
	var date = Date.now();
	var h = date.toString();
	console.log(h);
	jp._id = h;
	jp.JobName = req.body.JobName;
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
	
};

//Get function for the Job Search:-
exports.getJobPosts = function(req,res){
	JobPosts.find({'SkillSet':req.params.key},function(err,response){
		if(err)
			throw err;
		res.json(response);
	})
};
