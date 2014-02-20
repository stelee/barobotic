var Barobotic=function(){
	this.BAROBOTIC_TAG=_getDeviceName();

	this.onStarted=function(){
		console.log("started");
	}

	this.onFailed=function(error){
		console.error(error);
	}
	this.onSuccess=function(){
		console.log("success");
	}
}

Barobotic.prototype.resetDevice=function(){
	context.storage.remove("barobotic");
}

Barobotic.prototype.register=function(eventName,func){
	this[eventName]=func;
}
Barobotic.prototype.run=function(command){
	var that=this;
	var clearBluetooth=function(next,errorMsg){
	    bluetoothSerial.clear();
	    bluetoothSerial.unsubscribe();
	    bluetoothSerial.disconnect(function(){
	      console.log("bluetooth device disconnected");
	      if(isNull(errorMsg)){
	      	that.onSuccess();
	      }else
	      {
	      	that.onFailed({error:errorMsg});
	      }
	     
	    },function(error){
	      that.onFailed(error);
	    });

    }

	this.onStarted();
	
	var seq=new core.sequence.Sequence();
	if(isNull(context.storage.get("barobotic"))){
		//register a new device automatically
		seq.register(function(next){
			bluetoothSerial.list(function(deviceList){
			var foundFlag=false;
            for(var index in deviceList){
              var item=deviceList[index];
              if(item.name==that.BAROBOTIC_TAG){
                context.storage.set("barobotic",item);
                console.log("Found the barobotic");
                foundFlag=true;
                break;
              }
            }
            if(foundFlag)
            {
            	next();
            }else
            {
            	that.onFailed({error:"The machine is out of scope"});
            }
            
          },function(){
            that.onFailed({error:"The machine is out of scope"});
          })
		})
	}
	seq.register(function(next){
      var device=context.storage.get("barobotic");
      bluetoothSerial.connect(device.address,function(){
        console.log("connected to the device");
        next();
      },function(error){
      	console.error(error);
        clearBluetooth(next,"no connection");
      })
    })
    .register(function(next){
    	 bluetoothSerial.write(command,function(){
	        console.log("data written "+command);
	        next();
	      },function(error){
	      	console.error(error);
	        clearBluetooth(next,"write data failed");
	      });
    })
    .register(function(next){
    	setTimeout(function(){
    		console.log("detecting the deadlock")
    		if($.mobile.activePage.attr("id")=="doMakeDialog")
    		{
    			//deadlock happens
    			clearBluetooth(next,"No response from the server");
    		}
    	},60000);
    	console.log("subscribe the callback for response from the BT device");
    	bluetoothSerial.subscribe('\r',function(msg){
		    console.log("Get the return from the device "+msg);
		    if(msg.indexOf("*DONE")==-1){
		     	clearBluetooth(next,"Failed to make the cocktails")
		    }else
		    {
		    	clearBluetooth(next);
		    }
		  },function(error){
		    console.error(error);
		    clearBluetooth(next,"Failed to make the cocktails")
		  })
    }).execute();
}
module.exports.barobotic=new Barobotic();