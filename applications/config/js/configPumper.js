define(function(require,exports,module){
  module.exports.onEnter=function(){
    var pumperCode=context.parameter.get("pumperCode");
    $(".text_pumper").text(pumperCode);
    $(".text_drink").text(context.parameter.fetch("drink"));
    var drinkEntity=require("js/services/entity.drink");
    drinkEntity.listAll(function(list){
      var listview=new comp.Listview("#drink_list");
		  listview.render(list,function(item,$li){
        var htmlstr="<a href='#' onclick='setToPumper()' self-code='{code}'><h1>{name}</h1><p>{description}</p>";
        $li.html(
          htmlstr.bind(item)
        );
		 })
    });
    setToPumper=function(){
      var drinkCode=$(event.target).parent("a").attr("self-code");
      var pumperCode=context.parameter.get("pumperCode");
      var pumperConfig=require("js/services/pumperConfig").pumperConfig;
      pumperConfig.on(function(){
        history.back();
      }).set(pumperCode,drinkCode);
      
    }
  }
})
