define(function(require,exports,module){
  var onEnter=function(){
    var deviceName=_getDeviceName();
    $("#deviceName").val(deviceName);

    pumperConfig=require("js/services/pumperConfig").pumperConfig;
    pumperConfig.on("list",function(){
      var listview=new comp.Listview("#pumper_list");
      $("#pumpNumber").val(this.entities.length);
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
  module.exports.onEnter=onEnter;
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
    context.storage.remove("barobotic");//reset the saved device information
  }
  module.exports.resetPump=function(){
    var pumpNumber=parseInt($("#pumpNumber").val());
    var currentPumpNumber=$("#pumper_list").children().length;
    if(currentPumpNumber==pumpNumber){
      //do nothing
    }else if(pumpNumber==0){
      $("#pumpNumber").val(currentPumpNumber)
    }else
    {
      gapConfirm("If you reset the number of the pump, you will reset all the configuration of the pumps",
        function(){
          var pumperConfig=require("js/services/pumperConfig").pumperConfig;
          pumperConfig.on("reset",function(){
            onEnter();
          }).reset(pumpNumber);
        },
        function(){})
    }
  }
})
