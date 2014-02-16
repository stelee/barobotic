define(function(require,exports,module){
	module.exports.cancel=function(){
		history.back();
	}

	module.exports.save=function(){
		var name=$("#name").val();
		var description=$("#description").val();
		if(isNull(name)||name==""){
			gapAlert("Please fill the name");
			return;
		}
		var dbs=new entity.Base();
		var sqls=new Array();
		var code=getCurrentTimestamp();
		sqls.push(
			"INSERT INTO recipe \
			(code,name,description) \
			VALUES\
			('{code}','{name}','{description}')".bind({
				code:code,
				name:name,
				description:description
			})
		);
		var recipeDetails=context.parameter.fetch('recipeDetails');
		for(var i in recipeDetails)
		{
			var details=recipeDetails[i];
			if(isNull(details.drink_code)
				||details.drink_code==-1
				||details.quantity==0)
			{
				continue;
			}
			sqls.push(
				"INSERT INTO recipe_drink (recipe_code,drink_code,quantity) \
				VALUES \
				({recipe_code},{drink_code},{quantity})".bind({
					recipe_code:code,
					drink_code:details.drink_code,
					quantity:details.quantity
				})
				)

		}
		var db=new DBClient();
		db.update(sqls,function(error){console.error(error)},function(){
			history.back();
		})
	}
})