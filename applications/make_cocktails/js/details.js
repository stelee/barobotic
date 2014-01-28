define(function(require,exports,module){
	module.exports.onEnter=function(){
		var id=context.parameter.fetch("id");
		var maker=require("js/services/cocktailsMaker").maker();
		maker.on("get recipe",function(){
			var recipe=this.recipe;
			$("#recipe_name").text(recipe.name);
			$("#recipe_description").text(recipe.description);
			//$("#recipe_cover").css("background-image","url("+recipe.cover+")")
			var image=new Image();
			image.src=recipe.cover;
			image.onload=function(){
				$("#recipe_cover").css("background-image","url("+recipe.cover+")")
			}
		}).getRecipe(id)
	}
	module.exports.make=function(){
		var maker=require("js/services/cocktailsMaker");
		maker.make();
	}
	module.exports.custom=function(){
		_loadApp("mix-up");
	}
})