//2533424276.50c070e.901a46f84a964f68a34ab98b4cd7a7a9

var User = function(access_token){
  this.access_token = access_token;
};


User.prototype.me = function(callback){
  $.getJSON("https://api.instagram.com/v1/users/self/?callback=?&access_token=" + this.access_token, function(data){
    callback(data);
  })
};

User.prototype.posts = function(callback){
  $.getJSON("https://api.instagram.com/v1/users/self/media/recent/?callback=?&access_token=" + this.access_token, function(data){
    callback(data);
  })
};




$(document).ready(function(){
  if(window.location.hash){
    var url = window.location.hash.substr(1);

    var access_token = url.split('=')[1];

    var user = new User(access_token);

    user.me(function(json){
      $('.ava__image').attr('src',json.data.profile_picture);
      $('.user-info__nickname').html(json.data.username);
      $('.user-info__description').html(json.data.bio);
      $('.panel__count-post').html(251);

      $('.followers__count').html(json.data.counts.followed_by);
      $('.following__count').html(json.data.counts.follows);
      $('.private-site__link').attr('href',json.data.website).html(json.data.website);
    });


    user.posts(function(json){
      console.log(json);
    });

  }

});
