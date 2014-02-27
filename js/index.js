define(function(require,exports,module){
	module.exports.onEnter=function()
	{
		$.mobile.activePage.css("height","100%")
		initializeDB();
		setTimeout(function(){
			var Barobotic=require("js/services/barobotic").Barobotic;
			var barobotic=new Barobotic();
			barobotic.onFailed=function(){
				$("#info").text("Can't connect to the cocktails maker, \
					please check your bluetooth settings and turn on the device");
			}
			barobotic.onSuccess=function(){
				$("#info").text("Your cocktails maker is ready");
			}
			
			barobotic.checkDevice();
		},1000);
	}
	module.exports.make=function(event)
	{
		_loadApp("make_cocktails");
	}
	module.exports.fav=function(event)
	{
		_loadApp("fav");
	}
	module.exports.mix_up=function(event)
	{
		_loadApp("mix-up");
	}
	module.exports.config=function(event)
	{
		_loadApp("config");
	}
	initializeDB=function(){
		var dbs=require("js/services/databaseService");
		dbs.createDatabase(app.dbConfig.migration_version,function(){
			console.log("database initialized");
		});
	}
})