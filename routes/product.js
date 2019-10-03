var express = require('express');
var router = express.Router();
var product = require('../models/product');
 
router.get('/:id?',function(req,res,next){
  if(req.params.id){
      product.getProductById(req.params.id,function(err,rows){     
          if(err) {
            res.json(err);
          }
          else{
            if(rows == 0){
              return res.status(404).send({
                message: 'This product does not exist.'
              });
            } else {
              res.json(rows);
            }
          }
      });
   }
   else{
      product.getAllProducts(function(err,rows){         
          if(err){
            res.json(err);
          }
          else{
            res.json(rows);
          }
      });
   }
});
 
module.exports=router;