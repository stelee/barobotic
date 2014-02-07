module.exports.up=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	dbo.saveToDB("recipe",["code","name","description"],
		[
			["1","Niubility Shot","This is just a sample, I know nothing about that"],
			["2","Beijing Fog","The most pollution in the world"],
			["3","Duck Lady","What? I don't know what's this"],
			["4","Java programmer","I think this is for the programmer"],
			["5","Wolf of Wallstreet","the evil of the evil"],
			["6","University student","I am a GOOD guy"],
			["7","Risk","Take the your own risk for this"],
		],[],onSuccess,onFailed);
}
module.exports.down=function(onSuccess,onFailed){
	//TODO:delete all the data
	var dbo=new entity.Base("recipe");
	dbo.delete("1=1",true);
	onSuccess();
}