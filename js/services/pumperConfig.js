define(function(require,exports,module){
  var PumperConfig=function(){}
  _MIX(PumperConfig,core.utils.mixers.callbackable);

  PumperConfig.prototype.list=function(){
    var that=this;
    var sql="select pumperConfig.code as code,drink_code,name \
    from pumperConfig left outer join drink on pumperConfig.drink_code=drink.code"

    var dbs=new entity.Base();
    dbs.on('listBySql',function(){
      that.entities=[];
      for(var entryIndex in this.entities)
      {
        var entry=this.entities[entryIndex];
        if(isNull(entry.drink_code))
        {
          that.entities.push({
            code:entry.code,
            drink_code:-1,
            name:'Not configured'
          });
        }else{
          that.entities.push(entry);
        }
       
      }

      that.trigger("list");
    }).listBySql(sql);

  }
  PumperConfig.prototype.set=function(pumperCode,drinkCode)
  {
    var dbs=new entity.Base("pumperConfig");
    var that=this;
    dbs.on(function(){
      that.trigger('set')
    }).update({
      "drink_code":drinkCode
    },"code="+pumperCode,true);
  }

  module.exports.pumperConfig=new PumperConfig();

});
