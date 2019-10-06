//reference of dbconnection.js
var db = require('../dbconnection'); 
 
var product = {
 
	getAllProducts:function(callback){
		return db.query(
			" SELECT *  " +
			" FROM product" +
			" ORDER BY product_name ASC ",
			callback
		);
	},

	getProductById:function(id, callback){
		return db.query(
			" SELECT * " +
			" FROM product" +
			" WHERE product_id = ? ",
			[id],
			callback
		);
	},

   addProduct:function(product,callback){
      return db.query(
      	" INSERT INTO product " +
			" SET product_name = ?, unit_price = ?, lc_dt = NOW(), cr_dt = NOW()",
			[product.product_name,product.unit_price],
			callback
		);
   },

   updateProduct:function(id,product,callback){
      return db.query(
      	" UPDATE product " +
			" SET product_name = ?, unit_price = ?, lc_dt = NOW() " +
			" WHERE product_id = ?",
			[product.product_name,product.unit_price,id],
			callback
		);
   },

   deleteProduct:function(id,callback){
		//TODO: Zodra een product wordt verwijderd moet deze ook verwijderen uit de cart_order
		// Indien er niks meer overblijft aan de gekoppelde cart moet deze ook verwijderd worden.





      return db.query("DELETE FROM product WHERE product_id = ?",[id],callback);
   }


};
module.exports = product;