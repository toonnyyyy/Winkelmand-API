var express = require('express');
var router = express.Router();
var Customer=require('../models/Customer');
 
router.get('/:id?',function(req,res,next){
    if(req.params.id){
        Customer.getCustomerById(req.params.id,function(err,rows){     
            if(err) {
              res.json(err);
            }
            else{
            res.json(rows);
            }
        });
     }
     else{
        Customer.getAllCustomers(function(err,rows){         
            if(err){
              res.json(err);
            }
            else{
            res.json(rows);
            }
        });
     }
});
 
router.post('/',function(req,res,next){
    Customer.addTask(req.body,function(err,count){
      if(err){
        res.json(err);
      }
      else{
        res.json(req.body);
        //or return count for 1 &amp;amp;amp; 0
      }
    });
 });
 
 
router.delete('/:id',function(req,res,next){
    Customer.deleteTask(req.params.id,function(err,count){
      if(err){
        res.json(err);
      }
      else{
        res.json(count);
      }     
    });
 });
 
 
router.put('/:id',function(req,res,next){ 
    Customers.updateTask(req.params.id,req.body,function(err,rows){     
      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
 });
 
 module.exports=router;