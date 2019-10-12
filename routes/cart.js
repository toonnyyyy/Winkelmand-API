var express = require('express');
var router = express.Router();
var cart = require('../models/cart');

//get shoppingcart by customer id
router.get('/customer/:id?', function (req, res) {
  if (req.params.id) {
    cart.getCartByCustomerId(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      if (rows == 0) {
        return res.status(404).send({
          message: 'This customer does not have shoppingcarts.'
        });
      } else {
        res.json(rows);
      }
    });
  } else {
    // no customer id specified
    return res.status(404).send({
      message: 'No id specified'
    });
  }
});

//get shoppingcart by cart id
router.get('/:id?', function (req, res) {
  if (req.params.id) {
    cart.getCartByCartId(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      if (rows == 0) {
        return res.status(404).send({
          message: 'No cart found'
        });
      } else {
        res.json(rows);
      }
    });

  } else {
    // no cart id specified
    return res.status(404).send({
      message: 'No id specified'
    });
  }
});

// Create shoppingcart by customer id
router.post('/customer/:id?', function (req, res) {
  if (req.params.id) {
    cart.setCartByCustomerId(req.params.id, function (err, rows) {
      if (err) {
        return res.status(404).send({
          message: 'This customer does not exist.'
        });
      } else {
        if (rows.affectedRows > 0) {
          return res.status(200).send({
            message: 'Cart has been succesfully set.'
          });
        }
      }
    });
  }
});

// Add product to shoppingcart. If the product already exists in the shoppingcart, 
// then change the amount and total price
router.post('/', function (req, res) {
  cart.setCartOrderByCartId(req.body, function (err, rows) {
    if (err) {
      // if product_id and cart_id already exists
      if (err.code == 'ER_DUP_ENTRY') {
        cart.setAmountandTotalPriceIfProductExistsInCart(req.body, function (err, rows) {
          if (err) {
            return res.status(500).send({
              message: 'Error in de database'
            });
            // mysql throws a warning when amount is not valid
          } else if (rows.warningCount == 1) {
            return res.status(404).send({
              message: 'No valid input for amount'
            });
          } else if (rows.affectedRows > 0) {
            return res.status(200).send({
              message: 'Product alreay exists in the cart, so the amount and total price was changed.'
            });
          }
        })
        // if product or shoppingcart does not exists
      } else if (err.code == 'ER_NO_REFERENCED_ROW_2') {
        return res.status(404).send({
          message: 'No valid input for product id or cart id'
        });
      } else {
        return res.status(500).send({
          message: 'Error in de database'
        });
      }
    } else {
      // if product does not exists in the cart
      if (rows.affectedRows > 0) {
        return res.status(200).send({
          message: 'Product and amount succesfully added to cart.'
        });
      } else {
        return res.status(500).send({
          message: 'Error in de database'
        });
      }
    }
  });
});

//update cart order by cart id
router.put('/', function (req, res) {
  cart.updateCartOrderByCartId(req.body, function (err, rows) {
    if (err) {
      // if product or shoppingcart does not exists
      if (err.code == 'ER_NO_REFERENCED_ROW_2') {
        return res.status(404).send({
          message: 'No valid input for product id or cart id'
        });
        // mysql throws a warning when amount is not valid
      } else if (rows.warningCount == 1) {
        return res.status(404).send({
          message: 'No valid input for amount'
        });
      } else {
        return res.status(500).send({
          message: 'Error in de database'
        });
      }
    } else {
      //cart order has been succesfully updated
      if (rows.affectedRows > 0) {
        return res.status(200).send({
          message: 'Cart has been succesfully updated'
        });
      } else {
        // mysql sets affected rows to zero when input is incorrect
        return res.status(404).send({
          message: 'No valid input'
        });
      }
    }
  });
});

//delete cart by cart id
router.delete('/:id?', function (req, res) {
  if (req.params.id) {
    cart.deleteCartByCartId(req.params.id, function (err, rows) {
      if (err) {
        return res.status(500).send({
          message: 'Error in de database'
        });
      } else {
        if (rows.affectedRows > 0) {
          return res.status(200).send({
            message: 'Cart has been succesfully deleted.'
          });
        } else {
          return res.status(404).send({
            message: 'Cart id not found'
          });
        }
      }
    });
  } else {
    // No paramater given
    return res.status(404).send({
      message: 'No parameter given'
    });
  }
});

//delete cart order by cart id and product id
router.delete('/:cart_id?/product/:product_id?', function (req, res) {

  if (req.params.cart_id) {
    cart.deleteCartOrder(req.params.cart_id, req.params.product_id, function (err, rows) {
      if (err) {
        console.log(err)
        return res.status(500).send({
          message: 'Error in de database'
        });
      } else {
        if (rows.affectedRows > 0) {
          return res.status(200).send({
            message: 'Cart order has been succesfully deleted.'
          });
        } else {
          return res.status(404).send({
            message: 'Cart id or product id not found'
          });
        }
      }
    });
  } else {
    // No paramater given
    return res.status(404).send({
      message: 'No parameter given'
    });
  }
});

module.exports = router;