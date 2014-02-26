var handleList=function(list){
  var listview=new comp.Listview("#drink_list");
  listview.render(list,function(item,$li){
    var htmlstr="<a href='#' onclick='setToPump()' self-code='{code}'><h1>{name}</h1><p>{description}</p>";
    $li.html(
      htmlstr.bind(item)
    );
 })
}
var drinkEntity=require("js/services/entity.drink");

var searchShouldStart=false;

module.exports.onEnter=function(){
    var pumperCode=context.parameter.get("pumperCode");
    $(".text_pumper").text(pumperCode);
    $(".text_drink").text(context.parameter.fetch("drink"));
    drinkEntity.listAll(handleList,10);
}
module.exports.detach=function(){
  var pumperCode=context.parameter.get("pumperCode");
  var pumperConfig=require("js/services/pumperConfig").pumperConfig;
  pumperConfig.on(function(){
    history.back();
  }).set(pumperCode,-1);
}
setToPump=function(){
  var $target=$(event.target);
  if($target.prop('tagName')!='A')
  {
    $target=$target.parents("a");
  }
  var drinkCode=$target.attr("self-code");
  var pumperCode=context.parameter.get("pumperCode");
  var pumperConfig=require("js/services/pumperConfig").pumperConfig;
  pumperConfig.on(function(){
    history.back();
  }).set(pumperCode,drinkCode);  
}
module.exports.onSearch=function(){
  searchShouldStart=true;
}
context.interval=setInterval(function(){
    if(searchShouldStart==true){
      var searchstr=$("#searchBox").val();
      drinkEntity.search(searchstr,handleList,10);
      searchShouldStart=false;
    }
},1000)

