var express = require('express');
var router = express.Router();
var cart = require('../models/cart');
 
//getCartOrderByCustomerId:function(id, callback){
router.get('/customer/:id?',function(req,res,next){
  if(req.params.id){
    cart.getCartOrderByCustomerId(function(err,rows){         
      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
  }
});

//getCartByCartId:function(id, callback){
router.get('/:id?',function(req,res,next){
  if(req.params.id){
    cart.(function(err,rows){         
      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
  }
});

//setCartByCustomerId:function(id, callback){
router.post('/customer/:id?',function(req,res,next){
  if(req.params.id){
    cart.setCartByCustomerId(function(err,rows){         
      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
  }
});

//setCart_orderByCart_orderId:function(cart_id, product_id, amount, callback){
router.post('/customer/:id?',function(req,res,next){
  if(req.params.id){
    cart.setCart_orderByCart_orderId(function(err,rows){         
      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
  }
});

//updateCart_orderByCart_orderId:function(cart_id, product_id, amount, callback){
router.post('/:id?',function(req,res,next){
  if(req.params.id){
    cart.updateCart_orderByCart_orderId(function(err,rows){         
      if(err){
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
  }
});

//deleteCart_orderByCartProductId:function(id, callback) {
router.delete('/customer/:id?',function(req,res,next){
  if(req.params.id){
    cart.deleteCart_orderByCartProductId(function(err,rows){         
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