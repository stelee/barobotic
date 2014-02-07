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
	module.exports.maker=function(){
		return (new Maker());
	}
	module.exports.make=function(){
		(new Maker())
			.on("make",function(){console.log("make cocktails")})
			.make();
	}
})