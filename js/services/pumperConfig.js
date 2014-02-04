define(function(require,exports,module){
  var PumperConfig=function(){}
  _MIX(PumperConfig,core.utils.mixers.callbackable);

  PumperConfig.prototype.list=function(){
    var that=this;
    this.list=[
      {code:0,drink_code:1,name:"sample drink 1"},
      {code:1,drink_code:2,name:"sample drink 2"},
      {code:2,drink_code:3,name:"sample drink 3"},
      {code:3,drink_code:4,name:"sample drink 4"},
      {code:4,drink_code:5,name:"sample drink 5"},
      {code:5,drink_code:6,name:"sample drink 6"},
      {code:6,drink_code:7,name:"sample drink 7"},
      {code:7,drink_code:8,name:"sample drink 8"}

    ]
    that.trigger("list");
  }

  module.exports.pumperConfig=new PumperConfig();

});
