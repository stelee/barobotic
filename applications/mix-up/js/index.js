define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#3498DB");
	}
	module.exports.try=function(){
		var maker=require("js/services/cocktailsMaker");
		maker.make();
	}
	module.exports.save=function(){
		_loadApp("mix-up","save");
	}
})