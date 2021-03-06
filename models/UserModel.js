var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Post = new Schema({ status : {  type: String, required: true, trim: true  } });

var user = new Schema({UserId:Number, 
					   FirstName:String, 
					   LastName:String, 
					   Address:String,
					   Country:String, 
					   ZipCode: Number,
					   Bio: String,
					   Email:String,
                       Posts:[ ],

					   Company:{
				   		  Name:String,
				   		  Title:String, 
				   		  StartDate: String,
				   		  EndDate:String,
				   		  Description:String
						   		},
					  Education:{
						  School:String,
						  Degree:String,
						  Field:String,
						  Level:String,
						  Grade:String,
						  StartDate:String,
						  EndDate:String
						  },
					  Posts:String,
					  UserFollowed:[Number],
					  CompanyFollowed:[Number],
					  JobsApplied:[Number]
					  });

module.exports = mongoose.model("UserProfile", user);