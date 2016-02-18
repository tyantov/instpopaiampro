var instagramModule = angular.module('instagramModule',['ngRoute']).config(function($routeProvider){

});


instagramModule.service('Url',function(){
    var access_token, url, str = window.location.hash;

    if(str) {
        url = str.substr(1);
        access_token = url.split('=')[1];
    }

    this.access_token = access_token;
});




instagramModule.controller('UserCtrl',function($scope,$http,Url){

    var token = Url.access_token;
    $scope.token = token;

   $http.jsonp("https://api.instagram.com/v1/users/self/?callback=JSON_CALLBACK&access_token=" + token).success(function(response){
       $scope.me = response.data;
   });

    $http.jsonp("https://api.instagram.com/v1/users/self/media/recent/?callback=JSON_CALLBACK&access_token=" + token).success(function(response){
        $scope.photos = response.data;
        //console.log($scope.photos);
    });

});


instagramModule.controller('SearchCtrl',function($scope,$http,Url){
    var token = Url.access_token;

    $scope.searchUser = function(arg){
        $http.jsonp('https://api.instagram.com/v1/tags/' + arg + '/media/recent?callback=JSON_CALLBACK&count=100&access_token='+token).success(function(response){
            $scope.photos = response.data;
            console.log($scope.photos);
        });
    };
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