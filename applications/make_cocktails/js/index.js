define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#1ABC9C");
		var recipeService=require("/js/services/recipe.js");

		var list=recipeService.getRecipeList();
		var listview=new comp.Listview("#recipe_list");
		listview.render(list,function(item,$li){
			var htmlstr="<a href='#' onclick='makeDrink({id})'><h1>{name}</h1>\
			<p>{description}</p></a>";
			
		 	$li.html(
		 		htmlstr.bind(item)
		 	);
		 })
	}
	makeDrink=function(id){
		// if(isNull(context.storage.get("alreadyMakeDrink")))
		// {
		// 	gapConfirm("Almost there! Are you sure to make the drink?",
		// 		function(){
		// 			context.storage.set("alreadyMakeDrink",true)
		// 			makeDrink(id);
		// 		},function(){
		// 			//no nothing
		// 		})
		// 	return;
		// }
		// var maker=require("js/services/cocktailsMaker");
		// maker.make();
		context.parameter.set("id",id);
		_loadApp("make_cocktails","details");
	}
})