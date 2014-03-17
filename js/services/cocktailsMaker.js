define(function(require,exports,module){
	var Maker=function(){};
	_MIX(Maker,core.utils.mixers.callbackable)
  Maker.prototype.makeByRecipe=function(recipeDetails,volume)
  {
    if(isNull(volume))
    {
      volume=1;
    }
    var command="*D=";
    var sep="";
    var startFlag=false;
    for(var recipeIndex in recipeDetails){
      var recipe=recipeDetails[recipeIndex];
      if(recipe.quantity<0)
      {
        startFlag=false;
        break;
      }else if(recipe.quantity>0)
      {
        startFlag=true;
      }

      command+=sep+recipe.quantity*volume;
      sep=",";
    }
    command+="\r";
    if(startFlag==false)
    {
      gapAlert("You can't make drink with all quantity set to 0 or less than 0");
      return;
    }
    this.make(command);

  }

  Maker.prototype.makeByRecipeCode=function(code,volume){
    var that=this;
    if(isNull(volume))
    {
      volume=1;
    }

    var sql="select pumperConfig.code as code,cast(quantity as integer) as quantity from pumperConfig left outer join recipe_drink on recipe_code='"+code+"' and recipe_drink.drink_code=pumperConfig.drink_code order by pumperConfig.code"
    var dbs=new entity.Base();
    dbs.on(function(){
      var recipeDetails=[];
      for(var index in this.entities)
      {
        var recipe={};
        var entry=this.entities[index];
        recipe.code=entry.code;
        recipe.quantity=entry.quantity;
        if(isNull(recipe.quantity))
        {
          recipe.quantity=0;
        }
        recipeDetails.push(recipe);
      }
      
      that.makeByRecipe(recipeDetails,volume);
    }).listBySql(sql);
  }

	Maker.prototype.make = function(command) {
    var _this=this;
    if(isNull(command))
    {
      //this is the sample for testing
      command="*D=12,7,5,5,20,10\r";
    }
    var barobotic=require("js/services/barobotic").barobotic;
    barobotic.onStarted=function(){
      $.mobile.changePage( "../make_cocktails/doMake.html", { role: "dialog"} )
    }
    barobotic.onFailed=function(error){
      $("#progressText").text("Failed");
      $("#loader").hide();
      setTimeout(function(){
        $("#doMakeDialog").dialog("close");
        _this.trigger("make");
      },1000);
    }
    barobotic.onSuccess=function(){
      $("#progressText").text("Done");
      $("#loader").hide();
      setTimeout(function(){
        $("#doMakeDialog").dialog("close");
        _this.trigger("make");
      },1000);
    }
    barobotic.run(command);

	}

	Maker.prototype.getRecipe=function(code,callBack){
		var sql="select * from recipe where code={code}".bind("code",code)
		var dbo=new entity.Base();
		var that=this;
		dbo.on("findFirstBySql",function(){

			that.recipe=this.entity;
			that.trigger('get recipe')
		}).findFirstBySql(sql)
	}

	module.exports.Maker=Maker;
	module.exports.maker=new Maker()
	module.exports.make=function(){
		(new Maker())
			.on("make",function(){console.log("make cocktails")})
			.make();
	}
})