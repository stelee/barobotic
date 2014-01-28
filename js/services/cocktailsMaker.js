define(function(require,exports,module){
	var Maker=function(){};
	_MIX(Maker,core.utils.mixers.callbackable)
	Maker.prototype.make = function() {
		$.mobile.changePage( "../make_cocktails/doMake.html", { role: "dialog"} )
		var _this=this;
		setTimeout(function(){
			$("#progressText").text("Done!");
			$("#loader").hide();
			setTimeout(function(){
				$("#doMakeDialog").dialog("close");
				_this.trigger("make");
			},1000);
 			
 		},7000)
	};

	Maker.prototype.getRecipe=function(id){
		this.recipe= {
			name:"A Gilligan's Island",
			description:"1 oz vodka,1 oz peach schnapps,\
3 oz orange juice,3 oz cranberry juice.Shaken, not stirred.",
			cover:"http://pocketcocktails.com/wp-content/uploads/2012/11/gilligansisland.jpg"
		}
		this.trigger("get recipe");
	}

	module.exports.Maker=Maker;
	module.exports.maker=function(){
		return (new Maker());
	}
	module.exports.make=function(){
		(new Maker())
			.on("make",function(){console.log("make cocktails")})
			.make();
	}
})