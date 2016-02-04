var Race = (function(){


  var appName = Race;

  //stack private methods
  var privateMethods = {};



  function Race(){

  };

  //Set current class name
  var _setClassName = function(className){
    Race.currentClassName = className;
  };

  //get current class name
  var _getClassName = function(){
    return Race.currentClassName;
  };


  appName.config = function(callback){
    callback(Race);
  };

  //not work...
  Race.constructor = function(callback){

  };



  //create class
  Race.register = function(className,callback){



    //check whether there is already a class
    if(window[className] === undefined){


      window[className] = function(){

      };

      _setClassName(window[className]);

      if(window[className].__id__ === undefined){
        window[className].__id__ = className;
      }


      callback(Race);
    }
  };

  Race.debug = function(){
    if(Race.mode === "debug")
      return privateMethods;
  };


  //static
  Race.static = function(methodName,callback){
    _getClassName()[methodName] = callback;
  };


  //public
  Race.public = function(methodName,callback){

    //check whether there is already public method in class
    if(_getClassName().prototype[methodName] === undefined){
      _getClassName().prototype[methodName] = callback
    }else{
      console.log(1);
    }
  };

  //realization functional public method
  Race.getPublic = function(methodName){
    return _getClassName().prototype[methodName];
  };


  //realization functional private method
  Race.private = function(methodName,callback){

    //if not exist __id__ then assing empty hash
    if(!privateMethods[_getClassName().__id__]){
      privateMethods[_getClassName().__id__] = {};
    }

    //if not exists in hash private methods then add, else ...
    if(privateMethods[_getClassName().__id__][methodName] === undefined){
      privateMethods[_getClassName().__id__][methodName] = callback;
    }
  };


  //get access to private method
  Race.getPrivate = function(methodName){
    return privateMethods[_getClassName().__id__][methodName];
  };

  return Race;
})();
