module.exports.up=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	dbo.saveToDB("pumperConfig",["code","drink_code"],
		[
			["1","1"],
			["2","2"],
			["3","3"],
			["4","4"],
			["5","5"],
			["6","6"],
			["7","7"],
		],[],onSuccess,onFailed);
}
module.exports.down=function(onSuccess,onFailed){
	//TODO:delete all the data
	var dbo=new entity.Base("pumperConfig");
	dbo.delete("1=1",true);
	onSuccess();
}