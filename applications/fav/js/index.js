define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#ceaf33");
		var recipeService=require("js/services/recipe.js");

		
		showList=function(list){
			var listview=new comp.Listview("#recipe_list");
			listview.render(list,function(item,$li){
				var htmlstr="<a href='#' onclick='makeDrink({code})'><h1>{name}</h1>\
				<p>{description}</p></a>";

			 	$li.html(
			 		htmlstr.bind(item)
			 	);
				$li.attr("self-recipe-code",item.code);
			 })
		}
		
		var list=recipeService.getFavRecipeList(showList);
		context.parameter.set("editMode",false);
	}
	module.exports.changeEditMode=function(){

		if(!context.parameter.get("editMode")){
			$("#recipe_list>li span.ui-icon").removeClass("ui-icon-arrow-r").addClass("ui-icon-minus")
			context.parameter.set("editMode",true);
		}else
		{
			$("#recipe_list>li span.ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-arrow-r")
			context.parameter.set("editMode",false);
		}
		
	}
	makeDrink=function(id){
		if(context.parameter.get("editMode")){
			removeFav(id);
		}else
		{
			gapConfirm("Almost there! Are you sure to make the drink?",
				function(){
					var maker=require("js/services/cocktailsMaker").maker;
		      		maker.makeByRecipeCode(id);
				},function(){
					//no nothing
				})

		}
    		
	}
	removeFav=function(id){
		gapConfirm("Are you sure to remove this recipe from the fav list?",function(){
			var dbs=new entity.Base("recipe");
			dbs.on(function(){
				$("li[self-recipe-code="+id+"]").remove();
				$("#recipe_list").listview("refresh");
			}).update({"is_fav":0},"code='"+id+"'",true);
		},function(){})
		
	}

})
