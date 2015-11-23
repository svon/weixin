(function (resp) {
  window.wxShareConfig = function(callback){
    callback(resp);
  };
  try{
    window.wxShare && window.wxShare.ready(resp);
  }
  catch(e){

  }
})(arguments[0]);