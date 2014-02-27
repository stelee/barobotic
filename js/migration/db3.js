module.exports.up=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	dbo.saveToDB("pumperConfig",["code","drink_code"],
		[
			["1","479"],
			["2","480"],
			["3","378"],
			["4","462"],
			["5","5"],
			["6","6"]
		],[],onSuccess,onFailed);
}
module.exports.down=function(onSuccess,onFailed){
	//TODO:delete all the data
	var dbo=new entity.Base("pumperConfig");
	dbo.delete("1=1",true);
	onSuccess();
}