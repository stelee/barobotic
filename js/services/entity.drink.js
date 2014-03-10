module.exports.listAll=function(callBack,limit){
  if(isNull(limit))
  {
    limit=50;
  }
  var dbs=new entity.Base("drink");
  dbs.on(function(){
    callBack(this.entities);
  }).listAll(limit);
}
module.exports.search=function(searchstr,callBack,limit){
	var dbs=new entity.Base();
	var limitstr="";
	if(!isNull(limit)){
		limitstr=" limit "+limit;
	}
	dbs.on(function(){
		callBack(this.entities);
	}).listBySql("select * from drink where name like '%{s}%' or description like '%{s}%'".bind(
		"s",sqlSafe(searchstr))+limitstr)
}