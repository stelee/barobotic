define(function(require,exports,module){
  var PumpConfig=function(){}
  _MIX(PumpConfig,core.utils.mixers.callbackable);

  PumpConfig.prototype.reset=function(pumpNumber){
    var that=this;
    var dbo=new entity.Base("pumperConfig");
    dbo.on(function(){
      var datas=[];
      for(var i=0;i<pumpNumber;i++){
        datas.push([i,-1]);
      }
      var dbo2=new entity.Base();
      dbo2.saveToDB("pumperConfig",["code","drink_code"],
        datas,[],function(){
          that.trigger("reset");
        },function(error){console.error(error)});
    }).delete("1=1",true);
  }

  PumpConfig.prototype.list=function(){
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
  PumpConfig.prototype.set=function(pumperCode,drinkCode)
  {
    var dbs=new entity.Base("pumperConfig");
    var that=this;
    dbs.on(function(){
      that.trigger('set')
    }).update({
      "drink_code":drinkCode
    },"code="+pumperCode,true);
  }

  module.exports.pumperConfig=new PumpConfig();

});
