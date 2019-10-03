//reference of dbconnection.js
var db=require('../dbconnection'); 
 
var Customer={
 
	getAllCustomers:function(callback){
		return db.query("SELECT * FROM customer",callback);
	},

	getCustomerById:function(id, callback){
		return db.query("SELECT * FROM customer where customer_id=?",[id],callback);
	},

	getTaskById:function(id,callback){
		return db.query("select * from task where Id=?",[id],callback);
	},

	addTask:function(Customer,callback){
		return db.query("Insert into task values(?,?,?)",[Customer.Id,Customer.Title,Customer.Status],callback);
	},

	deleteTask:function(id,callback){
		return db.query("delete from task where Id=?",[id],callback);
	},

	updateTask:function(id,Customer,callback){
		return db.query("update task set Title=?,Status=? where Id=?",[Customer.Title,Customer.Status,id],callback);
	}

};
module.exports=Customer;