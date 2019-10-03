//reference of dbconnection.js
var db = require('../dbconnection'); 
 
var customer = {
 
	getAllCustomers:function(callback){
		return db.query("SELECT * FROM customer",callback);
	},

	getCustomerById:function(id, callback){
		return db.query("SELECT * FROM customer where customer_id=?",[id],callback);
	},

	addCustomer:function(customer,callback){
		return db.query("INSERT INTO customer SET name = ?, email = ?, lc_dt = NOW(), cr_dt = NOW()",[customer.name,customer.email],callback);
	},

	updateCustomer:function(id,customer,callback){
		return db.query("UPDATE customer SET name = ?, email = ?, lc_dt = NOW() where customer_id = ?",[customer.name,customer.email,id],callback);
	},

	deleteCustomer:function(id,callback){
		return db.query("DELETE FROM customer WHERE customer_id = ?",[id],callback);
	}

};
module.exports = customer;