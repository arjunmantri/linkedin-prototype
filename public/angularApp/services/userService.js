app.factory('userService',function($q, $http){
      return{
    	  getUserFollowing: function () {
   
        var deferred = $q.defer(),
          httpPromise = $http.get("/userFollowing");
 
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
        console.log("value "+deferred.promise );
        return deferred.promise;
      }
     }
	/*this.getUserFollowing = function(){
		var users = $http.get("/userFollowing").success(function(response) {
	    	return response;
	    	 });
		return users;
	}*/
})

app.factory('searchService',function($http){
	var searchKey;
	return{
		setSearchKey:function(key){
		 	this.searchKey = key;
		},
		user:function(searchKey){ 
			//if(searchKey=="yash"){
				//return searchKey;
			//}
			$http.get("/userSearch/"+searchKey).success(function(response){
				alert("success");
				//console.log(response);
				 return response;
			})
		}
	}
})