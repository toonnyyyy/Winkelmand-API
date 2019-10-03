var express = require('express');
var router = express.Router();
var Customer=require('../models/customer');
 
router.get('/:id?',function(req,res,next){
  if(req.params.id){
      Customer.getCustomerById(req.params.id,function(err,rows){     
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
  Customer.addCustomer(req.body,function(err){
    if(err){
      res.json(err);
    }
    else{
      return res.status(200).send({
          message: 'Customer has been succesfully created.'
      });
    }
  });
});

router.put('/:id',function(req,res,next){ 
  Customer.updateCustomer(req.params.id,req.body,function(err,rows){     
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
  });
});
 
router.delete('/:id',function(req,res,next){
  Customer.deleteCustomer(req.params.id,function(err,rows){
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