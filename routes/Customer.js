var express = require('express');
var router = express.Router();
var customer=require('../models/customer');
 
router.get('/:id?',function(req,res,next){
  if(req.params.id){
      customer.getCustomerById(req.params.id,function(err,rows){     
          if(err) {
            res.json(err);
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
            res.json(err);
          }
          else{
            res.json(rows);
          }
      });
   }
});
 
router.post('/',function(req,res,next){
  if(req.body.email == "" || req.body.name == ""){
    return res.status(400).send({
      message: 'Missing email or name.'
    });
  } else {
    customer.addCustomer(req.body,function(err){
      if(err){
        res.json(err);
      } else {
        return res.status(200).send({
            message: 'Customer has been succesfully created.'
        });
      }
    });
  }
});

router.put('/:id',function(req,res,next){ 
  customer.updateCustomer(req.params.id,req.body,function(err,rows){     
    if(req.body.email == "" || req.body.name == ""){
      return res.status(400).send({
        message: 'Missing email or name.'
      });
    } else {
      if(err){
        res.json(err);
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
 
router.delete('/:id',function(req,res,next){
  customer.deleteCustomer(req.params.id,function(err,rows){
    if(err){
      res.json(err);
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