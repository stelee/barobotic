define(function(require,exports,module){
	module.exports.onEnter=function(){
		var id=context.parameter.get("id");
		var maker=require("js/services/cocktailsMaker").maker;
		maker.on("get recipe",function(){
			var recipe=this.recipe;
			$("#recipe_name").text(recipe.name);
			$("#recipe_description").text(recipe.description);
			if(recipe.is_fav==1)
			{
				$("#btnFav").text("Remove From Fav").button('refresh');
			}

			//$("#recipe_cover").css("background-image","url("+recipe.cover+")")
			if(!isNull(recipe.image_url)){
				var image=new Image();
				image.src=recipe.cover;
				image.onload=function(){
					$("#recipe_cover").css("background-image","url("+recipe.cover+")")
				}
			}
		}).getRecipe(id)
	}
	module.exports.make=function(){
		var volume=1;
		var recipeCode=context.parameter.get("id");

		var maker=require("js/services/cocktailsMaker").maker;
		maker.makeByRecipeCode(recipeCode,volume);
	}
	module.exports.custom=function(){
		context.parameter.set("recipeCode",context.parameter.get("id"));
		_loadApp("mix-up");
	}
	module.exports.fav=function(){
		var id=context.parameter.get("id");
		var recipe=require("js/services/recipe");
		if($("#btnFav").text()=='Remove From Fav')
		{
			recipe.removeFav(id,function(){gapAlert("Successfully remove this to the fav")});
			$("#btnFav").text("Add Fav").button('refresh');
		}else
		{
			recipe.addFav(id,function(){gapAlert("Successfully add this to the fav")});
			$("#btnFav").text("Remove From Fav").button('refresh');
		}
	}
})
