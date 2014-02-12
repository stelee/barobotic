module.exports.up=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	var sql='ALTER TABLE "recipe" ADD COLUMN is_fav INTEGER'
	dbo
	.on("altered",onSuccess)
	.on("error",onFailed)
	.executeSql(sql,"altered");

}
module.exports.down=function(onSuccess,onFailed){
	var dbo=new entity.Base();
	var sql='ALTER TABLE "recipe" REMOVE COLUMN is_fav'
	dbo
	.on("altered",onSuccess)
	.on("error",onFailed)
	.executeSql(sql,"altered");
}