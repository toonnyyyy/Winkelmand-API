var mysql=require('mysql');
var connection=mysql.createPool({ 
  host:'ig03restapi.mysql.database.azure.com',
  user:'webuser@ig03restapi',
  password:'IG03database@',
  database:'shoppingcart',
  ssl: true
});
module.exports=connection;