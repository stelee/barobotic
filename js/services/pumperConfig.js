define(function(require,exports,module){
  var PumperConfig=function(){}
  _MIX(PumperConfig,core.utils.mixers.callbackable);

  PumperConfig.prototype.list=function(){
    var that=this;
    var sql="select pumperConfig.code as code,drink_code,name \
    from pumperConfig join drink where pumperConfig.drink_code=drink.code"

    var dbs=new entity.Base();
    dbs.on('listBySql',function(){
      that.list=this.entities;
      that.trigger("list");
    }).listBySql(sql);

  }

  module.exports.pumperConfig=new PumperConfig();

});
