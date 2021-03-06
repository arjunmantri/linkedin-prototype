
app.controller('UserController', function ($scope,$rootScope, $http, userService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
	$rootScope.UserId=document.getElementById("UserId").value;
    init();
    
    function init() {
    	$http.get("/userFollowing/"+$rootScope.UserId).success(function(response) {
		    	 $scope.users = response;
		    	 });
    	$http.get("/companyFollowing").success(function(response){
    		$scope.companies=response;
    	});
    	$http.get("/getJobPosts").success(function(response){
    		$scope.jobposts=response;
    	})
    	$http.get("/userRecommendation").success(function(response){
    		if(response!=null){
			$scope.userRecommendations = response;
    		}
		})
		$http.get("/jobRecommendation").success(function(response){
			console.log(response);
			$scope.jobRecommendations = response;
		})
    }

    $scope.saveInfo = function () {
    	$http({
            method: 'POST',
            url: '/userProfile',
            data: { 
                    "Address":$scope.address,
                    "Country":$scope.country,
                    "ZipCode":$scope.zipcode,
                    "Bio":$scope.bio,
                    "CompanyName": $scope.companyName, 
                    "CompanyTitle": $scope.inputTitle,                               
                    "CompanyStartDate": $scope.startDate,
                    "CompanyEndDate": $scope.endDate,
                    "CompanyDescription": $scope.inputDescription,
                    "EducationSchool": $scope.inputSchool,
                    "EducationDegree":$scope.degree,                            
                    "EducationField": $scope.inputField,
                    "Level": $scope.inputLevel,
                    "Grade": $scope.inputGrade,
                    "EducationStartDate": $scope.schoolStartDate,
                    "EducationEndDate": $scope.schoolEndDate                                             
                    
                }
            
         }).success(function(response){
           
            alert(JSON.stringify(response));
            
            if(response.save == "Success")
              window.location = '/viewProfile';
            else
              window.location = '/viewProfile';
        }).error(function(error){
            alert("error");
        });
    };

    $scope.updateMyStatus = function(){
    
        if($scope.status.length != 0)
        {
            $http.post('/status', ({"status" : $scope.status})).success(function(response){
            
                console.log("Status post req complete " + response);
                $scope.status = "";
            
        }).error(function(error){
        
                console.log("Status post req err " + error);
        })
        }//if
        else{ }
        
    }//updateMyStatus
    
    
});

app.controller('ProfileController', function ($scope,$http, userService){
	console.log("In CONTROLLER")
	init();
	
	function init(){
		$http.get("/getProfile").success(function(response){
			$scope.profile = response;
		})
	}
	
	$scope.editInfo = function(){
		console.log("In editprofile")
        window.location = '/editProfile';
	}
	
});

app.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true;
        } else {
            return false;
        }
    }
});

app.controller('CompanyDashboardController',function($scope,$http){
	
    console.log("CompanyDashboardController");
    
    init();
	
	function init(){
	
        $http.get('/getOwnJobPosts').success(function(res){
            
            console.log("POSTS " + JSON.stringify(res));
			$scope.posts = res;
		})
        
        $http.get('/company/status').success(function(res){
            
            console.log("POSTS " + JSON.stringify(res));

            $scope.status = res.status;
        })
    }
});

app.controller('CompanyProfileController',function($scope,$http){
	init();
	
	function init(){
		$http.get('/getCompanyProfile').success(function(res){
			$scope.profile=res;
		})
	}
	
	$scope.editInfo = function(){
		console.log("In Company editprofile");
	   window.location = '/editCompanyProfile';
	}
    
    $scope.postJobs = function(){
        
        window.location = '/company/jobs';
    }
})

app.controller('NavbarController', function ($scope, $location,searchService) {
	init();
	function init(){
		console.log("In navbar controller");
	}
	
	$scope.search=function(){
		console.log("Search key is " +$scope.searchKey);
		$location.path('/search/'+$scope.searchKey);
	}
});


app.controller('SearchController', function ($scope, $http,$routeParams,searchService){
	init();
	function init(){
		console.log("Search key is " +$routeParams.searchKey);
		$http.get("/userSearch/"+$routeParams.searchKey).success(function(response){
			//alert(response);
			$scope.results = response;	
		})
		
		$http.get("/companySearch/"+$routeParams.searchKey).success(function(response){
			//alert(response);
			console.log("/companySearch/ "+response);
			$scope.companies = response;	
		})
		
		$http.get("/jobSearch/"+$routeParams.searchKey).success(function(response){
			//alert("response");
			console.log("/jobSearch/ " + response)
			$scope.job = response;	
		})
	}
	
	$scope.follow=function(id){
		$http.put("/followUser",({"Id":id}))
            .success(function(response){
                alert("success")
                $scope.results="";
                window.location('#/home');
			})
            .error(function(error){
            
                window.location('/home');
            });
		}
	$scope.followCompany=function(id){
		$http.put("/followCompany",({"Id":id})).success(function(response){
			alert("success");
			$scope.results=""
		});
	}
	$scope.apply=function(id){
		$http.put("/applyJob",({"Id":id})).success(function(response){
			alert("success")})
			$scope.results=""
	}
	
})

app.controller('careerPathController',function ($scope, $http){
		$scope.items = ['CEO','CFO','CIO','COO','CTO','phd','Director_of_HR','Senior_Manager','VP_of_Products',
		                'FInance_Manager',
		                'Product_Manager',
		                'VP_of_Operations',
		                'SVP_of_Innovation',
		                'Senior_HR_Manager',
		                'Senior_QE_Manager',
		                'Started_a_Company',
		                'VP_of_Engineering',
		                'CEO_of_own_company',
		                'Innovation_Manager',
		                'SVP_of_Engineering',
		                'Director_of_FInance',
		                'Director_of_Products',
		                'Director_of_Operations',
		                'Director_of_Engineering']
		var selectedItem = $scope.selectedItem;
		$scope.showPath = function(item){
			$http.get("/showCareerPath/"+item).success(function(response){
				console.log(response);
				$scope.title = response;
			})
			//$scope.results = {'Title':[
			  //                         {Path1:['Software Engineer','CEO','Software Manager','CTO']},
			    //                       {Path2:['Software Engineer','CEO','Software Manager','CTO']}
			      //                     	]
			        //          }
		}
		
})

app.controller('userRegController', ['$scope', userRegistration])

app.controller('userLoginController', ['$scope', userLogin])

//app.factory('userservice', ['$http', '$state', userServiceHandler])

function userServiceHandler($http)
{
    var serviceObj = { };
    
    function logUserIn(existingUser)
    {
        console.log("In logUserIn " + existingUser);
        
        return $http.post('/login/user', existingUser)
        .success(function(response){
        
                console.log("In POST success");
        })
        .error(function(response){
                console.log("In POST error");
        });
    }
    
    return{
        
        dataObj: serviceObj,
        logUserIn: logUserIn
    }
}



function userLogin($scope)
{
   // var service = userservice;

    /*========= HANDLE MULTIPLE VIEWS HERE ========*/
    $scope.goLogin = true;
    $scope.goReg = false;
    $scope.goComReg = false;
    $scope.goCompanyLogin = false;
    
    $scope.goLogIn = function()
    {   
        $scope.goComReg = false;
        $scope.goLogin = !$scope.goLogin;  
        $scope.goReg = false;
    }
    
    $scope.goRegister = function()
    {   
        $scope.goReg = !$scope.goReg;   
        $scope.goLogin = false;
    }
    
    $scope.goCompanyReg = function()
    {
        $scope.goCompanyLogin = false;
        $scope.goComReg = !$scope.goComReg;
    }
    
    $scope.goCompanyLogIn = function()
    {
         $scope.goComReg = false;
         $scope.goCompanyLogin != $scope.goCompanyLogin;
    }
    
    $scope.switchToCompany = function()
    {
        $scope.goComReg = false;
        $scope.goLogin = false;
        $scope.goReg = false;
        $scope.goCompanyLogin = true;
    }
    
    $scope.switchToUser = function()
    {
        $scope.goComReg = false;
        $scope.goLogin = true;
        $scope.goReg = false;
        $scope.goCompanyLogin = false;
    }
    
    /*===========================================*/
    
   /* $scope.logMeIn = function()
    {
        console.log("Initial scope: " + $scope.existingUser);
        //call service to log user in
        service.logUserIn($scope.existingUser);       
        console.log("After POST in controller : " + service.dataObj);

    }*/
}


function userRegistration($scope)
{
}
