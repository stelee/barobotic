define(function(require,exports,module){
	var Maker=function(){};
	_MIX(Maker,core.utils.mixers.callbackable)
	Maker.prototype.make = function() {
		$.mobile.changePage( "../make_cocktails/doMake.html", { role: "dialog"} )

    var seq=new core.sequence.Sequence();
    var BAROBOTIC_TAG="linvor";
    var _this=this;
    var resultText="Done";
    
    var clearBluetooth=function(next){
      
      setTimeout(function(){
        bluetoothSerial.clear();
        bluetoothSerial.unsubscribe();
        bluetoothSerial.disconnect(function(){
          console.log("bluetooth device disconnected");
        },function(error){
          console.error(error);
        });
        $("#progressText").text(resultText);
        $("#loader").hide();
        setTimeout(function(){
          $("#doMakeDialog").dialog("close");
          _this.trigger("make");
        },1000);

      },7000)
    }


    if(isNull(context.session.get("barobotic")))
    {
      //find the barobotic device
      seq.register(
        function(next){
          bluetoothSerial.list(function(list){
            for(var index in list){
              var item=list[index];
              if(item.name==BAROBOTIC_TAG){
                context.session.set("barobotic",item);
                console.log("Found the barobotic");
                next();
                break;
              }
            }
          },function(){
            gapAlert("The barobotic is out of scope");
            return;
          })
         }
      )
    }
    
    seq.register(function(next){
      var device=context.session.get("barobotic");
      bluetoothSerial.connect(device.address,function(){
        console.log("connected to the device");
        next();
      },function(error){
        resultText="no connection";
        clearBluetooth(next);
      })
    })
    .register(function(next){
      
      bluetoothSerial.write("*D=12,,5,5,20,10\r",function(){
        console.log("data written");
        next();
      },function(error){
        resultText="no access"
        clearBluetooth(next);
      });
    })
    .register(function(next){
      bluetoothSerial.subscribe('\n',function(msg){
        console.log("Get the return from the device "+msg);
        if(msg!="*DONE"){
          resultText="Failed";
        }
        next();
      },function(error){
        resultText="Error";
        console.error(error);
        next();
      })
    })
    .register(clearBluetooth)

    seq.execute();


	};

	Maker.prototype.getRecipe=function(code,callBack){
		var sql="select * from recipe where code={code}".bind("code",code)
		var dbo=new entity.Base();
		var that=this;
		dbo.on("findFirstBySql",function(){

			that.recipe=this.entity;
			that.trigger('get recipe')
		}).findFirstBySql(sql)
	}

	module.exports.Maker=Maker;
	module.exports.maker=function(){
		return (new Maker());
	}
	module.exports.make=function(){
		(new Maker())
			.on("make",function(){console.log("make cocktails")})
			.make();
	}
})