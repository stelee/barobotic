define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#ceaf33");
		var recipeService=require("/js/services/recipe.js");

		
		showList=function(list){
			var listview=new comp.Listview("#recipe_list");
			listview.render(list,function(item,$li){
				var htmlstr="<a href='#' onclick='makeDrink({code})'><h1>{name}</h1>\
				<p>{description}</p></a>";

			 	$li.html(
			 		htmlstr.bind(item)
			 	);
			 })
		}
		
		var list=recipeService.getRecipeList(showList);
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
