define(function(require,exports,module){
  module.exports.listAll=function(callBack){
    var dbs=new entity.Base("drink");
    dbs.on(function(){
      callBack(this.entities)
    }).listAll();
  }
})
