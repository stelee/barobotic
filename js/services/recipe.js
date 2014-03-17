module.exports.getRecipeList=function(callBack){
	var sql="select code,name,description from recipe where code not in\
		(select recipe_code as code from recipe_drink where drink_code not in\
		 	(select drink_code from pumperConfig))"
	getRecipeListBySql(sql, callBack);
	
}
module.exports.getFavRecipeList=function(callBack)
{
	var sql="select code,name,description from recipe where is_fav=1 and code not in\
		(select recipe_code as code from recipe_drink where drink_code not in\
		 	(select drink_code from pumperConfig))"
	getRecipeListBySql(sql, callBack);
}
module.exports.addFav=function(code,callBack){
	var ent=new entity.Base("recipe");
	ent.on("update",callBack).update({"is_fav":1},"code='"+code+"'");
}
module.exports.removeFav=function(code,callBack){
	var ent=new entity.Base("recipe");
	ent.on("update",callBack).update({"is_fav":0},"code='"+code+"'");
}
module.exports.getRecipe=function(recipeCode,callBack){
	var sql="select drink_code,cast(quantity as integer) as quantity from recipe_drink where recipe_code ="+recipeCode;
	var dbo=new entity.Base();
	dbo.on(function(){
		callBack(this.entities)
	}).listBySql(sql);
}

var getRecipeListBySql=function(sql,callBack){
	var dbo=new entity.Base("recipe");
	dbo.on("listBySql",function(){
		callBack(this.entities);
	}).listBySql(sql);
}