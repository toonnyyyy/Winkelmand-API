//reference of dbconnection.js
var db = require('../dbconnection'); 
 
var cart = {
 
	getCartOrderByCustomerId:function(id, callback){
        return db.query("SELECT cart.*, SUM(cart_order.total_price) AS total_cart_price " +
            "FROM customer " +
            "INNER JOIN cart ON cart.customer_id = customer.customer_id " +
            "INNER JOIN cart_order ON cart_order.cart_id = cart.cart_id " +
            "WHERE customer.customer_id=? " +
            "GROUP BY cart.cart_id",[id],callback);
    },

	getCartByCartId:function(id, callback){
		return db.query("SELECT * FROM cart WHERE cart_id=?",[id],callback);
    },

	setCartByCustomerId:function(id, callback){
		return db.query("INSERT INTO cart (customer_id) " +
        "VALUES (customer_id, lc_dt, cr_dt)",[id],callback);
    },

    setCart_orderByCart_orderId:function(cart_id, product_id, amount, callback){
        let unit_price = db.query("SELECT unit_price FROM product WHERE product_id=?",[product_id],callback);
        
        return db.query("INSERT INTO cart_order SET cart_id =?, product_id = ?, amount = ?, " +
            "total_price = amount * unit_price, lc_dt = NOW(), cr_dt = NOW()",[cart_id, product_id, amount, unit_price],callback);
    },
    
    updateCart_orderByCart_orderId:function(cart_id, product_id, amount, callback){
        let unit_price = db.query("SELECT unit_price FROM product WHERE product_id=?",[product_id],callback);
        
        return db.query("UPDATE cart_order SET amount = ?, total_price = ?, lc_dt = NOW() " +
            "WHERE cart_id = ? AND product_id = ?",[amount, amount * unit_price, cart_id, product_id],callback);
    },
	
	deleteCart_orderByCartProductId:function(id, callback) {
		return db.query("DELETE FROM cart WHERE cart_id=?",[id],callback);
	},
	
	deleteCartByCartId:function(id, callback) {
		return db.query("DELETE FROM cart WHERE cart_id=?",[id],callback);
	}

};

module.exports = product;