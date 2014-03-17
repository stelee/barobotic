define(function(require,exports,module){
	var beautifyName=function(name,description){
		var baseName=name.substring(0,3);
		var betterName="";
		var foundCount=0;
		var searchFrom=name+description;
		if(searchFrom.toLowerCase().indexOf("liquor")>=0)
		{
			betterName="Lq";
			foundCount++;
		}
		if(searchFrom.toLowerCase().indexOf("vodka")>=0)
		{
			betterName="Vk";
			foundCount++;
		}
		if(searchFrom.toLowerCase().indexOf("rum")>=0)
		{
			betterName="Rm";
			foundCount++;
		}
		if(searchFrom.toLowerCase().indexOf("gin")>=0)
		{
			betterName="Gn";
			foundCount++;
		}
		if(searchFrom.toLowerCase().indexOf("whiskey")>=0)
		{
			betterName="Ws";
			foundCount++;
		}
		if(searchFrom.toLowerCase().indexOf("tequila")>=0)
		{
			betterName="Tq";
			foundCount++;
		}
		if(foundCount==1)
		{
			return betterName;
		}else
		{
			return baseName;
		}
	}
	var extraFill=[];
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#3498DB");
		var pumperConfig=require("js/services/pumperConfig").pumperConfig;
		var recipeDetails=context.session.get('recipeDetails');
		pumperConfig.on('list',function(){
			var listview=new comp.Listview("#pumper_list");
			listview.render(this.entities,function(item,$li){
				var tmp={code:item.code,name:item.name,description:item.description};
				if(isNull(tmp.name))
				{
					tmp.name="U"
				}else
				{
					tmp.name=beautifyName(tmp.name,tmp.description);
				}
				var $title=$('<h1></h1>');
				var $button=$("<button data-theme='a'  onclick='__proxy__(\"addDrink\",this)'>{name}</button>".bind(tmp))
				$title.append($button);
				$button.button();
				
				var $div=$("<div>");
				$input=$('<input type="number" data-type="vslider" min="0" max="45" value="0" data-highlight="true" sliderOrientation="verticalInverted">');
				$div.append($input);
				$input.vslider();
				$input.on( "change", function( event, ui ) {
					calculateTotal()
				} );


				//I have to fix the bug of slider

				// $div.find("input").attr({
				// 	type:"number",
				// 	"class":"ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-slider-input"
				// });
				$li.attr("self-drink-code",item.drink_code);
			 	$li.append($div).append($title);
			 });

			var windowWidth=$.mobile.activePage.width();
			var right=$("#control_pannel").width();
			var left=windowWidth-right-40;

			var perLineWidth=(100-34)/($("#pumper_list").children().length);

			$("#pumper_list").children().width(perLineWidth+"%")
			$("#pumper_list").width(left);
			$("#inputVolume").vslider();

		}).list();
		var recipeCode=context.parameter.fetch("recipeCode");

		if(recipeCode){
			setTimeout(function(){
				fillRecipe(recipeCode);
				$("li[self-drink-code=-1]").find("input").val(0).attr('disabled','disabled');
				$("li[self-drink-code=-1]").find("input").vslider('refresh');
			},200);
		}else{
			setTimeout(function(){
				resetEmptyPump(recipeDetails);
				$("li[self-drink-code=-1]").find("input").val(0).attr('disabled','disabled');
				$("li[self-drink-code=-1]").find("input").vslider('refresh');
			},200);
		}

		

	}
	module.exports.try=function(){
		tryRecipe();
	}
	module.exports.save=function(){
		
		var recipeDetails=buildRecipe();
		context.session.set('recipeDetails',recipeDetails);
		if(verifyRecipe(recipeDetails)==false)
		{
			gapAlert("You can't save recipe with all quantity set to 0 or less than 0");
			return;
		}
		context.parameter.set('recipeDetails',recipeDetails);
		_loadApp("mix-up","save");
	}
	module.exports.addDrink=function(button){
		var recipeDetails=[]
		var pump_length=$("#pumper_list").children().length;
		var currentIndex=$(button).parents("li").index();
		$("li[self-drink-code]").each(function(){
				$this=$(this);
				var details={};
				details.drink_code=$this.attr("self-drink-code");
				if($this.index()==currentIndex)
				{
					details.quantity=30;
				}else
				{
					details.quantity=0;
				}
				
				recipeDetails.push(details);
			}
		)
		tryRecipe(recipeDetails);

	}
	module.exports.cancel=function(){
		history.back();
	}

	var calculateTotal=function(){
		var total=0;
		$("#pumper_list").find("input").each(function()
			{
				total+= parseInt($(this).val());
			});
		$("#inputVolume").val(total);
		$("#inputVolume").vslider('refresh');
	}

	var tryRecipe=function(recipeDetails){
		if(isNull(recipeDetails))
			recipeDetails=buildRecipe();
		context.session.set('recipeDetails',recipeDetails);
		var volume=$("#inputVolume").val();
		var maker=require("js/services/cocktailsMaker").maker;
		maker.makeByRecipe(recipeDetails,volume);
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
	
	var resetEmptyPump=function(recipeDetails){
		for(var index in recipeDetails){
			var recipe=recipeDetails[index];
			$("li[self-drink-code="+recipe.drink_code+"]").find("input").val(recipe.quantity);
		}

	}
	var fillRecipe=function(recipeCode){
		$("li[self-drink-code]").find("input").val(0)
		var recipe=require("js/services/recipe");
		recipe.getRecipe(recipeCode,function(rList){
			for(index in rList){
				var item=rList[index];
				var weight=item.quantity;

				var $input=$($("li[self-drink-code="+item.drink_code+"]")[0]).find("input");
				if($input.length==0){
					extraFill.push({
						name:item.name,
						quantity:item.quantity
					})
				}else
				{
					$input.val(weight);
					$input.vslider('refresh');
				}
				
			}
			if(extraFill.length>0)
			{
				var sep="";
				var output=""
				extraFill.forEach(function(item){
					output+=sep+item.name+": "+item.quantity+" ml"
					sep=", "
				})
				$("#extraDesc").text("You also need to add: "+output);
			}
			calculateTotal();
		})
	}
})