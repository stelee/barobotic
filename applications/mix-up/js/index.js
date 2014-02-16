define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#3498DB");
		var pumperConfig=require("js/services/pumperConfig").pumperConfig;

		pumperConfig.on('list',function(){
			var listview=new comp.Listview("#pumper_list");
			listview.render(this.entities,function(item,$li){
				var $title=$('<h1>Pumper#{code}-{name}</h1>'.bind(item));
				
				var $div=$("<div>");
				$div.append('<input type="range" name="slider1" id="slider1" value="50" min="0" max="100" data-highlight="true">');
				$div.find("input").slider();

				//I have to fix the bug of slider

				$div.find("input").attr({
					type:"number",
					"class":"ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-slider-input"
				});
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
	module.exports.try=function(){
		var maker=require("js/services/cocktailsMaker");
		maker.make();
	}
	module.exports.save=function(){
		var recipeDetails=new Array();
		$("li[self-drink-code]").each(function(){
				$this=$(this);
				var details={};
				details.drink_code=$this.attr("self-drink-code");
				details.quantity=$this.find("input").val();
				recipeDetails.push(details);
			}
		)
		context.parameter.set('recipeDetails',recipeDetails);

		_loadApp("mix-up","save");
	}
	var resetEmptyPumper=function(){
		$("li[self-drink-code=-1]").find("input").val(0).slider('refresh').attr('disabled','disabled');
	}
	var fillRecipe=function(recipeCode){
		$("li[self-drink-code]").find("input").val(0).slider('refresh')
		var recipe=require("js/services/recipe");
		recipe.getRecipe(recipeCode,function(rList){
			var total=0;
			for(index in rList){
				total+=rList[index].quantity;
			}
			for(index in rList){
				var item=rList[index];
				var weight=Math.round(item.quantity/total*100);
				var $input=$($("li[self-drink-code="+item.drink_code+"]")[0]).find("input");
				$input.val(weight);
				$input.slider('refresh');
			}
			context.parameter.fetch("recipeCode");
		})
	}
})