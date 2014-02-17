define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#3498DB");
		var pumperConfig=require("js/services/pumperConfig").pumperConfig;

		pumperConfig.on('list',function(){
			var listview=new comp.Listview("#pumper_list");
			listview.render(this.entities,function(item,$li){
				var $title=$('<h1>Pumper#{code}-{name}</h1>(ml)'.bind(item));
				
				var $div=$("<div>");
				$div.append('<input type="number" value="5">');
				$div.find("input").textinput();

				//I have to fix the bug of slider

				// $div.find("input").attr({
				// 	type:"number",
				// 	"class":"ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-slider-input"
				// });
				$li.attr("self-drink-code",item.drink_code);
			 	$li.append($title).append($div);
			 })
		}).list();
		var recipeCode=context.parameter.get("recipeCode");
		if(recipeCode){
			setTimeout(function(){
				fillRecipe(recipeCode);
			},200);
		}else{
			setTimeout(function(){
				resetEmptyPumper();
			},200);
		}
	}
	var buildRecipe=function(){
		var recipeDetails=new Array();
		$("li[self-drink-code]").each(function(){
				$this=$(this);
				var details={};
				details.drink_code=$this.attr("self-drink-code");
				details.quantity=$this.find("input").val();
				recipeDetails.push(details);
			}
		)
		return recipeDetails;
	}
	var verifyRecipe=function(recipeDetails){
		var retFlag=false;
		for(var recipeIndex in recipeDetails){
	      var recipe=recipeDetails[recipeIndex];
	      if(recipe.quantity<0)
	      {
	        retFlag=false;
	        return retFlag;
	      }else if(recipe.quantity>0)
	      {
	        retFlag=true;
	      }
	      return retFlag;
	    }
	}
	module.exports.try=function(){
		var recipeDetails=buildRecipe()
		var volume=$("#inputVolume").val();
		var maker=require("js/services/cocktailsMaker").maker;
		maker.makeByRecipe(recipeDetails,volume);
	}
	module.exports.save=function(){
		var recipeDetails=buildRecipe();
		if(verifyRecipe(recipeDetails)==false)
		{
			gapAlert("You can't save recipe with all quantity set to 0 or less than 0");
			return;
		}
		context.parameter.set('recipeDetails',recipeDetails);
		_loadApp("mix-up","save");
	}
	var resetEmptyPumper=function(){
		$("li[self-drink-code=-1]").find("input").val(0).attr('disabled','disabled');
	}
	var fillRecipe=function(recipeCode){
		$("li[self-drink-code]").find("input").val(0)
		var recipe=require("js/services/recipe");
		recipe.getRecipe(recipeCode,function(rList){
			for(index in rList){
				var item=rList[index];
				var weight=item.quantity;
				var $input=$($("li[self-drink-code="+item.drink_code+"]")[0]).find("input");
				$input.val(weight);
			}
		})
	}
})