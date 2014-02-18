module.exports.up=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	dbo.saveToDB("recipe_drink",["recipe_code","drink_code","quantity"],
		[
			["1","1",10],
			["1","2",6],
			["1","4",6],
			["1","8",7],
			["2","1",10],
			["2","8",3],
			["2","12",4],
			["3","1",10],
			["3","8",3],
			["3","12",4],
			["4","1",4],
			["4","2",4],
			["4","3",4],
			["4","4",4],
			["4","5",4],
			["5","1",3],
			["5","2",3],
			["5","3",3],
			["6","1",5],
			["6","3",5],
			["7","1",2.5],
			["7","3",2.5],
			["7","5",2.5],
			["7","7",2.5]
		],[],onSuccess,onFailed);
}
module.exports.down=function(onSuccess,onFailed){
	//TODO:delete all the data
	var dbo=new entity.Base("recipe_drink");
	dbo.delete("1=1",true);
	onSuccess();
}