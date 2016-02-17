var instagramModule = angular.module('instagramModule',['ngRoute']).config(function($routeProvider){
    $routeProvider
    .when('/:username',{
        templateUrl:'page1.html'
    });
});




instagramModule.controller('UserCtrl',function($scope,$http){

   var token = getToken(window.location.hash);



   $http.jsonp("https://api.instagram.com/v1/users/self/?callback=JSON_CALLBACK&access_token=" + token).success(function(response){
       $scope.me = response.data;
   });

    $http.jsonp("https://api.instagram.com/v1/users/self/media/recent/?callback=JSON_CALLBACK&access_token=" + token).success(function(response){
        $scope.photos = response.data;
        console.log($scope.photos);
    });




   function getToken(str){
        if(str) {
            var url = str.substr(1);

            var access_token = url.split('=')[1];

        }

       return access_token;
    };



});


instagramModule.controller('SearchCtrl',function($scope,$http){
    var token = getToken(window.location.hash);

    $scope.searchUser = function(){
        $http.jsonp("https://api.instagram.com/v1/users/search?callback=JSON_CALLBACK&q="+$scope.nameSearch+"&access_token=" + token).success(function(response){
            $scope.me = response.data;
            console.log(response);
        });
    };

    function getToken(str){
        if(str) {
            var url = str.substr(1);

            var access_token = url.split('=')[1];

        }

        return access_token;
    };
});

instagramModule.controller('AuthCtrl',function($scope){

});



instagramModule.directive('fancybox',function(){
   return {
       link:function(scope,element,attrs){
           $(element).fancybox({
               openEffect  : 'none',
               closeEffect : 'none',
               nextEffect  : 'none',
               prevEffect  : 'none',
               padding     : 0,
               margin      : [20, 60, 20, 60]
           });
       }
   };
});