(function(){
	var setMeta=function(name,content)
	{
	    document.write("<meta name='"+name+"' content='"+content+"'>");
	}
	var linkCSS=function(link)
	{
	    document.write("<link rel='stylesheet' href='"+link+"'/>");
	}
	var includeJS=function()
	{
	    for(var i=0;i<arguments.length;i++){
	    	var src=arguments[i];
	    	document.write("<script charset='UTF-8' src='"+src+"'></script>");
	    } 
	}
	setMeta("viewport","width=device-width,initial-scale=1,user-scalable=no");
	setMeta("apple-mobile-web-app-capable","yes");
	//linkCSS("css/jquery.mobile.flatui.css");
	linkCSS("css/jqui/jquery-ui-1.10.4.custom.css");
	linkCSS("css/flatui.theme.css");
	linkCSS("jsWeb/jquery/vslider.css");
	linkCSS("css/app.css");
	includeJS("jsWeb/jquery/jquery.js",
		"cordova.js",
		"jsWeb/libs/core.namespace.js",
		"jsWeb/libs/core.session.js",
		"jsWeb/framework.js",
		"jsWeb/jquery/jquery-ui-1.10.4.custom.js",
		"jsWeb/jquery/jquery.mobile-1.3.1.min.js",
		"jsWeb/jquery/jquery.mobile-1.3.1.vslider.js",
		"jsWeb/libs/core.utils.js",
		"jsWeb/libs/core.database.js",
		"jsWeb/libs/core.file.js",
		"jsWeb/libs/core.sequence.js",
		"jsWeb/libs/json2.js",
		"jsWeb/libs/base64.js",
		"jsWeb/libs/base.data.js",
		"jsWeb/libs/core.webnpm.js",
		"js/app.js",
		"jsWeb/libs/ext.jqm.ui.js"
		);
})();

