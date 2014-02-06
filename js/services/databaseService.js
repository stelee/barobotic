define(function(require,exports,module){
	var path_prefix="js/migration/";
	module.exports.createDatabase=function(version,callBack){
		var onFinished=function(){
			context.storage.set("_db_version",version);
			callBack();
		}
		var db_version=parseInt(context.storage.get("_db_version"));
		if('undefined'== typeof(db_version))
		{
			db_version=0;
		}
		var migrations=new Array();

		if(version>db_version){
			for(var i=db_version+1;i<=version;i++){
				migrations.push(require(path_prefix+'db'+i));
			}
			runMigration(migrations,'up',onFinished);
		}else if(version<db_version)
		{
			for(var i=db_version;i>version;i--){
				migrations.push(require(path_prefix+'db'+i));
			}
			runMigration(migrations,'down',onFinished);
		}else
		{
			onFinished();
		}
	}
	runMigration=function(migrations,direction,onFinished){
		_EACH(migrations,function(migration,next){
			migration[direction](function(){
				next();
			},function(error){
				log.error(error);
				return;
			});
		},function(){
			onFinished();
		})
	}
})