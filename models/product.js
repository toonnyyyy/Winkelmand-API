//reference of dbconnection.js
var db = require('../dbconnection'); 
 
var product = {
 
	getAllProducts:function(callback){
		return db.query(
			`SELECT *
			FROM product
			ORDER BY product_name ASC`,
			callback
		);
	},

	getProductById:function(id, callback){
		return db.query(
			`SELECT *
			FROM product
			WHERE product_id = ?`,
			[id],
			callback
		);
	},

   addProduct:function(product,callback){
      return db.query(
      		`INSERT INTO product
			SET product_name = ?, unit_price = ?, lc_dt = NOW(), cr_dt = NOW()`,
			[product.product_name,product.unit_price],
			callback
		);
   },

   updateProduct:function(id,product,callback){
      return db.query(
      		`UPDATE product
			SET product_name = ?, unit_price = ?, lc_dt = NOW()
			WHERE product_id = ?`,
			[product.product_name,product.unit_price,id],
			callback
		);
   },

   deleteProduct:function(id,callback){
		return db.query(`DELETE FROM product WHERE product_id = ?`,[id],callback);
   },

	deleteCartOrder:function(id, callback) {
      return db.query (`DELETE FROM cart_order WHERE product_id = ?`, [id], callback);
	},

	getCartIds:function(id, callback) {
		return db.query(
		`SELECT c.cart_id
        FROM cart c LEFT JOIN cart_order co
        ON c.cart_id = co.cart_id
        GROUP BY c.cart_id, co.product_id
        HAVING COUNT(co.cart_id) < 1`, '', callback);
	},

	deleteCart(rows, callback) {
		var ids = [];
		for (var i in rows) {
			ids[i] = rows[i].cart_id;
		}
		// Voor elke id wat verwijderen.
      return db.query(
      	`DELETE FROM cart WHERE cart_id IN (" + ids.join(",") + ")`, '', callback);
	}

};

module.exports = product;