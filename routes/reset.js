var express = require('express');
var router = express.Router();
var reset = require('../models/reset');

router.delete('/', function (res) {
   reset.resetAll(function (err) {
      if (err) {
         res.json(err);
      } else {
         reset.addDummyData(function (err) {
            if (err) {
               res.json(err);
            } else {
               return res.status(200).send({
                  message: 'Database has been cleared.'
               });
            }
         });
      }
   });
});



module.exports = router;