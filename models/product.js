//reference of dbconnection.js
var db = require('../dbconnection'); 
 
var product = {
 
	getAllProducts:function(callback){
		return db.query("SELECT * FROM product",callback);
	},

	getProductById:function(id, callback){
		return db.query("SELECT * FROM product where product_id=?",[id],callback);
	}

};
module.exports = product;