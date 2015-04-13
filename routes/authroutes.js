//var connection = require('../config/sqldb.js');
var authHandle = require('../config/passportAuth.js');
var authHandleCompany = require('../config/passportAuthCompany');
var user = require('../routes/userprofile.js');
var company = require('../routes/companyprofile.js');
var routes = require('../routes/index.js');
var memcache = require('../routes/memcache.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');



router.use(function(req, res, next){

    
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    
    next();
});



/* GET home page. */
router.get('/', function(req, res){
    
        if(req.user === undefined){

            console.log("#User not logged in yet");
        }
        else{
            console.log("#User object " + req.user.email);
            console.log("#User already logged in");
        }
  
    
    console.log("==================== REQUEST  "+ JSON.stringify(req.user));

    res.render('LinkedInHome', { message: req.flash('message')});
    
});

/* USER login */

router.post('/signup/user', authHandle.registerNewUser, passport.authenticate('local-login', { successRedirect : '/editProfile', 
                                               failureRedirect : '/', 
                                               failureFlash : true 
      }));


router.post('/login/user', passport.authenticate('local-login', { successRedirect : '/profile/user', 
                                               failureRedirect : '/', 
                                               failureFlash : true 
      }));


router.get('/signup/user', function(req, res){
    res.render('signup', { message: req.flash('signupMessage') });
});


//get login page for user
router.get('/login/user', function(req, res){
 
    res.render('login', { user: req.user, message: req.flash('error') });
});


router.get('/logout', function(req, res){
    
      console.log("Logging out! " + req.user);
        req.logout();
        req.flash('message', 'Logged out');
        req.session.destroy(function(err){
          res.redirect('/');    
    });
      
});


router.get('/profile/user', isLoggedIn, function(req, res){
    
    res.render('ProfileManager', { user : 1});
});

router.get('/getProfile',user.getProfile)



/* COMPANY login and sign up routes*/


router.get('/signup/company', function(req, res){
    res.render('companysignup', { message: req.flash('signupMessage') });
});


router.post('/signup/company', authHandleCompany.registerNewCompany, passport.authenticate('local-company-login', { successRedirect : '/editCompanyProfile',
                                                                           failureRedirect : '/',
                                                                           failureFlash : true
   }));

/*
router.get('/login/company', function(req, res){
    
    res.render('companylogin', {user: req.company, message: req.flash('error')});
});
*/

router.post('/login/company', passport.authenticate('local-company-login', { successRedirect : '/company#/companyHome',
                                                                           failureRedirect : '/',
                                                                           failureFlash : true
   }));


router.get('/profile/company', isLoggedIn, function(req, res){
    
    
    console.log("From backend: " + JSON.stringify(req.user));
    
    res.render('profile', { user : req.user});
});



/* User dashboard routes*/

//get list of companies following
router.get('/companyFollowing',user.getCompanyFollowing)

//get lists of job posts
router.get('/getJobPosts',user.getJobPosts);

//profile edit page.
router.get('/editProfile',user.viewProfile);

//to get list of users followed
router.get('/userFollowing/:id',user.getUserFollowing)

//UserProfile page
router.get('/userProfile',user.getProfile);

//save profile info for users
router.post('/userProfile',user.postProfile);



/*company dashboard routes*/



//Company dashboard Api
router.get('/company',function(req,res){
	
	res.render('CompanyProfileManager');
})
//Company profile information and job posting details of the company
router.get('/getOwnJobPosts', company.getOwnJobPosts);

router.get('/getCompanyProfile',isLoggedIn,company.getProfile);

router.get('/editCompanyProfile', isLoggedIn, function(req, res){
    
    res.render('companyeditprofile.ejs', {'message' : req.user});
});


router.post('/companyprofile', company.updateCompanyInfo);



//save jobPosts in the company
router.post('/company/jobs',company.jobPosts);

router.get('/company/jobs', function(req, res, next){
    
    res.render('AddJob', {'message' : req.user});

});

//router.get('/getJob',company.getJobPosts);
router.get('/getJobs/:key',company.getJobPosts);

router.get('/getMemcache/:key',memcache.getFromMemcache);

//router.get('/getUsers/:key',user.getUsers);

//router.get('/getCompanies/:key',company.getCompanies);

/*=========== HELPER FUNCTIONS ===========================*/



function isLoggedIn(req, res, next)
{
    console.log("In isLoggedIn() ");
    
    var flag = req.isAuthenticated();
    
    console.log("@req.isauthenticated " + flag);
    
    if(!flag)
    {
        res.redirect('/');
    }
    
    if(flag)
    {   console.log("After req.isAuthenticated().....");
        return next();
    }
    //res.redirect('/');
}

module.exports = router;
