//require,exports,module
module.exports.up=function(onSuccess,onFailed){
	var Table=require("js/plugins/generalTable").Table;
	var sqls=new Array();
	debugger;
	sqls
	.push(
		(new Table("pumperConfig",[
			{name:"code",type:"VARCHAR",constraint:"UNIQUE NOT NULL"},
			{name:"drink_code",type:"VARCHAR"}
			])).creation_sql()
	);
	sqls.push(
		(new Table("drink",[
			{name:"code",type:"VARCHAR",constraint:"UNIQUE NOT NULL"},
			{name:"name",type:"VARCHAR",constraint:"NOT NULL"},
			{name:"description",type:"VARCHAR"},
			{name:"image_url",type:"VARCHAR"}
			])).creation_sql()
	);
	sqls.push(
		(new Table("recipe",[
			{name:"code",type:"VARCHAR",constraint:"UNIQUE NOT NULL"},
			{name:"name",type:"VARCHAR",constraint:"NOT NULL"},
			{name:"description",type:"VARCHAR"},
			{name:"image_url",type:"VARCHAR"}
			])).creation_sql()
	);

	sqls.push(
		(new Table("recipe_drink",[
			{name:"recipe_code",type:"VARCHAR",constraint:"NOT NULL"},
			{name:"drink_code",type:"VARCHAR",constraint:"NOT NULL"},
			{name:"quantity",type:"FLOAT"}
			])).creation_sql()
	);
	var db=new DBClient(app.dbConfig);
	db.create(sqls,onFailed,onSuccess);
}
module.exports.down=function(onSuccess,onFailed){
	var db=new DBClient(app.dbConfig);
	_EACH(["pumperConfig","drink","recipe","recipe_drink"],
		function(tableName,next){
			db.drop(tableName,
				function(error){onFailed(error);},
				next)
		},
		onSuccess
	)
}