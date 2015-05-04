var app = angular.module('usersApp', ['ngRoute']);
console.log("in app");
//This configures the routes and associates each route with a view and a controller

app.config(function ($routeProvider) {
    $routeProvider
    	.when('/home',
    	{
    			controller:'UserController',
    			templateUrl:'/views/home.ejs'
    	})
        .when('/editProfile',
            {
                controller: 'UserController',
                templateUrl: '/views/userprofile.ejs'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/personalprofile',
            {
                controller: 'ProfileController',
                templateUrl: '/views/personalprofile.ejs'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/companyEditProfile',
            {
                controller: 'CompanyController',
                templateUrl: '/view/companyEditProfile.ejs'
            })
        .when('/companyViewProfile',
        		 {
        	 	   controller: 'CompanyController',
        	 	   templateUrl: '/views/companyViewProfile.ejs'
        		 })
        .when('/companyHome',
            {
        	 	controller: 'CompanyDashboardController',
        	 	templateUrl: '/views/companyDashboard.ejs'
             })
        .when('/companyProfile',
        	{
        		controller:'CompanyProfileController',
        		templateUrl: '/views/companyProfile.ejs'
        	})
        .when('/search/:searchKey',
        	{
        		controller:'SearchController',
        		templateUrl:'/views/search.ejs'
        	})
        .when('/careerPath',
        		{
        			controller:'careerPathController',
        			templateUrl:'/views/careerPath.ejs'
        		})
        .otherwise({ redirectTo: '/home' });
});
