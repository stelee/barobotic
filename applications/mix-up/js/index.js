define(function(require,exports,module){
	module.exports.onEnter=function(){
		$.mobile.activePage.css("background","#3498DB");
		var pumperConfig=require("js/services/pumperConfig").pumperConfig;

		pumperConfig.on('list',function(){
			var listview=new comp.Listview("#pumper_list");
			listview.render(this.list,function(item,$li){
				var $title=$('<h1>Pumper#{code}-{name}</h1>'.bind(item));
				
				var $div=$("<div>");
				$div.append('<input type="range" name="slider1" id="slider1" value="50" min="0" max="100" data-highlight="true">');
				$div.find("input").slider();

				//I have to fix the bug of slider

				$div.find("input").attr({
					type:"number",
					"class":"ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-slider-input"
				});

			 	$li.append($title).append($div);
			 })
		}).list();
	}
	module.exports.try=function(){
		var maker=require("js/services/cocktailsMaker");
		maker.make();
	}
	module.exports.save=function(){
		_loadApp("mix-up","save");
	}
})