module.exports.up=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	dbo.saveToDB("recipe_drink",["recipe_code","drink_code","quantity"],
		[
			["1","1",0.5],
			["1","2",0.5],
			["1","4",0.5],
			["1","8",0.5],
			["2","1",1],
			["2","8",0.3],
			["2","12",0.4],
			["3","1",1],
			["3","8",0.3],
			["3","12",0.4],
			["4","1",0.4],
			["4","2",0.4],
			["4","3",0.4],
			["4","4",0.4],
			["4","5",0.4],
			["5","1",0.3],
			["5","2",0.3],
			["5","3",0.3],
			["6","1",0.5],
			["6","3",0.5],
			["7","1",0.25],
			["7","3",0.25],
			["7","5",0.25],
			["7","7",0.25]
		],[],onSuccess,onFailed);
}
module.exports.down=function(onSuccess,onFailed){
	//TODO:delete all the data
	var dbo=new entity.Base("recipe_drink");
	dbo.delete("1=1",true);
	onSuccess();
}