var Table=function(name,fields){
	this.name=name;
	this.fields=fields;
}
Table.prototype.creation_sql = function() {
	var sql='CREATE TABLE IF NOT EXISTS "{tableName}" ({fieldsString})';
	var tableName=this.name;
	var fieldsString='"id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL,ddlDate DATETIME DEFAULT current_timestamp,ddlFlag VARCHAR';
	for(var i=0;i<this.fields.length;i++){
		var field=this.fields[i];
		var tmpStr='"'+field.name+'"';
		if(field.type)
		{
			tmpStr+=" "+field.type;
		}
		if(field.constraint)
		{
			tmpStr+=" "+field.constraint;
		}
		fieldsString+=","+tmpStr;
	}
	return sql.bind({
		tableName:tableName,
		fieldsString:fieldsString
	});
};
module.exports.Table=Table;