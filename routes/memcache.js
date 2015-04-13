var AWS = require('aws-sdk'),
    Memcached = require('memcached');
var async = require('async');
/*var mc = Memcached.Client.create('hostname:port', {
  username: 'username',
  password: 'password'
});*/

exports.saveInMemcache = function(req,res){
	//Saving in Memcahed
			var locationForJob = req.body.JobLocation;
			var SkillForJob	= req.body.SkillSet;
			var JobNameForJob = req.body.JobName;
			mc.set(locationForJob, JobPosts,1000000,function(err,result){
					if(err) console.error(err);
					console.dir(result);
					mc.end();
				});
			mc.set(SkillForJob,JobPosts,1000000,function(err,result){
				if(err) console.error(err);
				console.dir(result);
				mc.end();
				});
			mc.set(JobNameForJob,JobPosts,1000000,function( err, result ){
				if(err) console.error(err);
					console.dir(result);
				mc.end();
			});
			mc.set("all",JobPosts,1000000,function( err, result ){
				if(err) console.error(err);
					console.dir(result);
				mc.end();
			});
};			
//End of saving to memcached

exports.getFromMemcache = function(req,res){
	var str = req.params.key//from the client side//
	//var array = str.split(',');
	mc.get(str,function(err,value){
		if(value != null){
			console.log(value);
			res.json(value);			
		}
	});
}
	/*async.each(array,
			function(key,callback){
				mc.get(key,function(err,value){
					if(value != null){
						console.log(value);	
						
					callback();
					}
				});
			},
			function(err){
					res.json(value)
				}		
		);
};*/
	/*mc.get(array[0],function(err,value,key){
		if(value != null){
			res.status(200).json({status : 200,message : "Successfull", response:data.Items});
			console.log(value);
		}
	});
	mc.get(array[1],function(err,value,key){
		if(value != null){
			console.log(value);
		}
	});
	mc.get(array[2],function(err,value,key){
		if(value != null){
			console.log(value);
		}
	});
	/*mc.get(SkillForJob,function(err,response,key){
		if(response != null){

		}
	});
	mc.get(JobNameForJob,function(err,response,key){
		if(response != null){

		}*/
	//});
	//
	// CompanyProfile.findOne({'CompanyId':req.body.CompanyId},function(err,response){
	// 	if (err)
	// 		throw err;
	// 	response.JobPosts.push(h);
	// 	response.save(function(err){
	// 		if(err)
	// 			throw err;
	// 		console.log(response);
	// 	});
		
	// });
	/*ejs.renderFile('./views/jobposts.ejs',function(err, result) {
		   // render on success
		   if (!err) {
		            res.end(result);
		   }
		   // render or error
		   else {
		            res.end('An error occurred');
		            console.log(err);
		   }
	   });*/
//}