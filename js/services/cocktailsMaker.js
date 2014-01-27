define(function(require,exports,module){
	module.exports.make=function(){
		$.mobile.changePage( "../make_cocktails/doMake.html", { role: "dialog"} )
		setTimeout(function(){
			$("#progressText").text("Done!");
			$("#loader").hide();
			setTimeout(function(){
				$("#doMakeDialog").dialog("close");
			},1000);
 			
 		},7000)
	}
})