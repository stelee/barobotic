define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#ceaf33");
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
    gapConfirm("Almost there! Are you sure to make the drink?",
				function(){
					var maker=require("js/services/cocktailsMaker");
		      maker.make();
				},function(){
					//no nothing
				})

	}
})
