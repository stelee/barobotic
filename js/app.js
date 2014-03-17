Namespace.register("app");
app.dbConfig={
		dbName:"Barobotic",
		version:"1.0",
		description:"Barobotic database",
		size:1000,
		migration_version:6
	}
app.items=[
	{
		id:"menu_1",
		url:"applications/make_cocktails/index.html",
		name:"Make",
		icon:"images/icons/png/Retina-Ready.png"
	},
	{
		id:"menu_2",
		url:"applications/fav/index.html",
		name:"Fav",
		icon:"images/icons/png/Pocket.png"
	},
	{
		id:"menu_3",
		url:"applications/mix-up/index.html",
		name:"Mix-up",
		icon:"images/icons/png/Infinity-Loop.png"
	},
	{
		id:"menu_4",
		url:"applications/config/index.html",
		name:"Config",
		icon:"images/icons/png/Pensils.png"
	}
]
//@Override
var beforeOnEnter=function(e){
	if(!isNull(context.interval)){
		clearInterval(context.interval);
	}
}
//@Override
var afterOnEnter=function(e){

	if($.mobile.activePage.attr("self-noMenu")!="true")
	{
		var Navigator=require("js/plugins/navigatorBar")
		var nav=new Navigator.Navigator();
		nav.setItems(app.items);
		nav.appendTo($.mobile.activePage);
		if($.mobile.activePage.attr("self-force-nocal")!="true"){
			setTimeout(function(){
				//var height=$(document).height()+$.mobile.activePage.children("[data-role=footer]").height();
	    		var height=$(document).height();
				$.mobile.activePage.children("[data-role=content]").css({
					height:height+"px"
				});
			},200)
		}
		
	}


	//bind the function
	$("[self-callback]")
	.unbind('click')
	.on("click",function(e){
		var func=$(e.target).attr("self-callback");
		if('function'==typeof($.mobile.activePage.controller[func])){
			$.mobile.activePage.controller[func](e);
		}else{
			alert("function "+func+" is not defined");
		}
	});

}
if('undefined'==typeof(bluetoothSerial))
{
	//mock it
	bluetoothSerial={};
	bluetoothSerial.clear=function(){console.log("bluetoothSerial.clear")};
	bluetoothSerial.unsubscribe=function(){console.log("bluetoothSerial.unsubscribe")};
	bluetoothSerial.disconnect=function(any){any();}
	bluetoothSerial.list=function(any){any([{name:"linvor",address:"12345"}]);}
	bluetoothSerial.connect=function(address,any,error){
		any();
		//error("mockfailed");
	}
	bluetoothSerial.write=function(myStr,any){
		console.log("write the string "+myStr);
		any();
	}
	bluetoothSerial.subscribe=function(det,any){
		setTimeout(function(){
			any("*DONE");
		},15000)
	}
}

var _getDeviceName=function(){
	var deviceName=context.storage.get("deviceName");
	if(deviceName==null)
	{
		deviceName="linvor";
	}
	return deviceName;
}
var _setDeviceName=function(deviceName){
	context.storage.set("deviceName",deviceName);
}
