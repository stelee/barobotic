define(function(require,exports,module){
  module.exports.onEnter=function(){
    pumperConfig=require("js/services/pumperConfig").pumperConfig;
    pumperConfig.on("list",function(){
      var listview=new comp.Listview("#pumper_list");
		  listview.render(this.entities,function(item,$li){
        var htmlstr="<a href='#' onclick='setPumper()' self-drink='{name}' self-pumperCode='{code}' self-drinkCode='{drink_code}'><h1>Pumper #{code} -- {name}</h1>";
        $li.html(
          htmlstr.bind(item)
        );
		 })
    })
    .list();
  }
  setPumper=function(pumperCode,drinkCode){
    var $target=$(event.target);
    if($target.prop('tagName')!='A')
    {
      $target=$target.parents("a");
    }
    context.parameter.set("pumperCode",$target.attr("self-pumperCode"));
    context.parameter.set("drinkCode",$target.attr("self-drinkCode"));
    context.parameter.set("drink",$target.attr("self-drink"));
    _loadApp("config","configPumper");
  }
  module.exports.reset=function(){
    gapConfirm("Are you sure to reset the connection to the device?",function(){
      require("js/services/barobotic").barobotic.resetDevice();
    },function(){})
  }
})
