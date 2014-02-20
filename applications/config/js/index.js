define(function(require,exports,module){
  module.exports.onEnter=function(){
    var deviceName=_getDeviceName();
    $("#deviceName").val(deviceName);

    pumperConfig=require("js/services/pumperConfig").pumperConfig;
    pumperConfig.on("list",function(){
      var listview=new comp.Listview("#pumper_list");
		  listview.render(this.entities,function(item,$li){
        var tmp={
          code:item.code,
          name:item.name,
          drink_code:item.drink_code

        };
        if(isNull(tmp.name))
        {
          tmp.name="Unconfigured"
        }
  
        var htmlstr="<a href='#' onclick='setPump()' self-drink='{name}' self-pumperCode='{code}' self-drinkCode='{drink_code}'><h1>Pump #{code} -- {name}</h1>";
        $li.html(
          htmlstr.bind(tmp)
        );
		 })
    })
    .list();
  }
  setPump=function(pumperCode,drinkCode){
    var $target=$(event.target);
    if($target.prop('tagName')!='A')
    {
      $target=$target.parents("a");
    }
    context.parameter.set("pumperCode",$target.attr("self-pumperCode"));
    context.parameter.set("drinkCode",$target.attr("self-drinkCode"));
    context.parameter.set("drink",$target.attr("self-drink"));
    _loadApp("config","configPump");
  }
  module.exports.reset=function(){
    gapConfirm("Are you sure to reset the connection to the device?",function(){
      require("js/services/barobotic").barobotic.resetDevice();
    },function(){})
  }
  module.exports.saveDeviceName=function(input){
    _setDeviceName($(input).val());
  }
})
