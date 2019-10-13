var express = require('express');
var router = express.Router();
var customer=require('../models/customer');
 
router.get('/customer/:id?',function(req,res){
  if(req.params.id){
      customer.getCustomerById(req.params.id,function(err,rows){     
          if(err) {
            return res.status(500).send({
              message: 'Error in de database.'
            });
          }
          else{
            if(rows == 0){
              return res.status(404).send({
                message: 'This customer does not exist.'
              });
            } else {
              res.json(rows);
            }
          }
      });
   }
   else{
      customer.getAllCustomers(function(err,rows){         
          if(err){
            return res.status(500).send({
              message: 'Error in de database.'
           });
          }
          else{
            res.json(rows);
          }
      });
   }
});
 
router.post('/customer',function(req,res){
  if(req.body.email == "" || req.body.name == ""){
    return res.status(400).send({
      message: 'Missing email or name.'
    });
  } else {
    customer.addCustomer(req.body,function(err){
      if(err){
        return res.status(500).send({
          message: 'Error in de database.'
       });
      } else {
        return res.status(200).send({
            message: 'Customer has been succesfully created.'
        });
      }
    });
  }
});

router.put('/customer/:id',function(req,res){ 
  customer.updateCustomer(req.params.id,req.body,function(err,rows){     
    if(req.body.email == "" || req.body.name == ""){
      return res.status(400).send({
        message: 'Missing email or name.'
      });
    } else {
      if(err){
        return res.status(500).send({
          message: 'Error in de database.'
       });
      }
      else{
        if(rows.affectedRows == 0){
          return res.status(404).send({
            message: 'This customer does not exist.'
          });
        } else {
          return res.status(200).send({
              message: 'Customer has been succesfully updated.'
          });
        }
      }
    }
  });
});
 
router.delete('/customer/:id',function(req,res){
  customer.deleteCustomer(req.params.id,function(err,rows){
    if(err){
      return res.status(500).send({
        message: 'Error in de database.'
     });
    }
    else{
      if(rows.affectedRows == 0){
        return res.status(404).send({
          message: 'This customer does not exist.'
        });
      } else {
        return res.status(200).send({
            message: 'Customer has been succesfully deleted.'
        });
      }
    }     
  });
});
 
module.exports=router;