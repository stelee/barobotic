define(function(require,exports,module){
	module.exports.getRecipeList=function(callBack){
		var sql="select code,name,description from recipe where code not in\
			(select recipe_code as code from recipe_drink where drink_code not in\
			 	(select drink_code from pumperConfig))"
		var dbo=new entity.Base();
		dbo.on("listBySql",function(){
			callBack(this.entities);
		}).listBySql(sql);
	}
})