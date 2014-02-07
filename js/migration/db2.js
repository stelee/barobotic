//initilize the data
module.exports.up=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	dbo.saveToDB("drink",["code","name","description"],
		[
			["1","7 Deadly Zins 2011","red wine"],
			["2","A Mandria di Signadore Patrimonio 2009","red wine"],
			["3","Domaine Ives Hill","blackberry wine"],
			["4","Domaine Mont-Vézeau Zéphyr 2012","strawberry wine"],
			["5","Global 40 %","Alcohol"],
			["6","Doornkaat Schnapps","Germany Alcohol"],
			["7","Beefeater","dry gin"],
			["8","Maxi Dry Gin","Canada dry gin"],
			["9","Crystal Head","Vodka"],
			["10","Chopin","Vodka"],
			["11","Absolut","Vodka"],
			["12","Canadian Club CLassic 12 years old","whisky"],
			["13","Blaalantine's Scotch Blended","Scotch Wisky"],
			["14","Appleton Estate 12 ans Extra","Rum"],
			["15","Bacardi Gold","Rum"]
		],[],onSuccess,onFailed);
}
module.exports.down=function(onSuccess,onFailed){
	//TODO:delete all the data
	var dbo=new entity.Base("drink");
	dbo.delete("1=1",true);
	onSuccess();
}