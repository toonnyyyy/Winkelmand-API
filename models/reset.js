//reference of dbconnection.js
var db = require('../dbconnection');

var reset = {
   resetAll: function (callback) {
      // delete alles van de tables en zet autoincrement op 1;
      // We kunnen niet truncate aangezien de foreign keys restrictions dit tegenhouden.
      sql = " DELETE FROM cart_order WHERE 1 = 1; ALTER TABLE cart_order AUTO_INCREMENT = 1;  ";
      sql += " DELETE FROM cart WHERE 1 = 1; ALTER TABLE cart AUTO_INCREMENT = 1; ";
      sql += " DELETE FROM customer WHERE 1 = 1; ALTER TABLE customer AUTO_INCREMENT = 1; ";
      sql += " DELETE FROM product WHERE 1 = 1; ALTER TABLE product AUTO_INCREMENT = 1; ";

      return db.query(sql, '', callback);

   },

   addDummyData(callback) {
      // voeg de customers toe
      sql = `INSERT INTO customer (name, email, lc_dt, cr_dt) VALUES
            ('Sibren van Paassen', 'sibren@mail.nl',  NOW(), NOW()),
            ('Tony van Leeuwen', 'tony@mail.nl', NOW(), NOW()),
            ('Ruben Knapen', 'ruben@mail.nl', NOW(), NOW()),  
            ('Robin Bastiaan', 'robin@mail.nl', NOW(), NOW());`;
      // voeg de producten toe
      sql += `INSERT INTO product (product_id, product_name, unit_price, lc_dt, cr_dt) VALUES
          (NULL, "Jong belegen kaas", 1.00, NOW(), NOW()),
          (NULL, "Oude kaas", 1.00, NOW(), NOW() ),
          (null, "Schimmel kaas", 1.00, NOW(), NOW()),
          (null, "Worst", 1.99, NOW(), NOW()),
          (null, "Botherhammenworst", 1.27, NOW(), NOW()),
          (null, "Cola 1L", 0.88, NOW(), NOW()),
          (null, "Cola 2L", 1.60, NOW(), NOW()),
          (null, "Sinas 1L", 0.88, NOW(), NOW()),
          (null, "Sinas 2L", 1.60, NOW(), NOW()),
          (null, "Heineken 0,23L", 0.50, NOW(), NOW()),
          (null, "Heineken Krat", 16.50, NOW(), NOW()),
          (null, "Heineken Radler", 1.25, NOW(), NOW()),
          (null, "Heineken Radler Krat", 32.75, NOW(), NOW()),
          (null, "Grolsch 0,23L", 0.50, NOW(), NOW()),
          (null, "Grolsch KRAT", 16.50, NOW(), NOW()),
          (null, "Grolsch Radler", 1.25, NOW(), NOW()),
          (null, "Grolsch Radler Krat", 32.75, NOW(), NOW());`;

      // voeg de cart toe
      sql += `insert into cart (cart_id, customer_id, lc_dt, cr_dt) values
          (null, 1, now(), now()),
          (null, 2, now(), now()), 
          (null, 3, now(), now()),
          (null, 4, now(), now()),
          (null, 1, now(), now());`;

      // voeg de cart_orders toe
      sql += `INSERT INTO cart_order (cart_id, product_id, amount, total_price, lc_dt, cr_dt) VALUES
            (1,6,10,10.00,now(), now()),
            (2,5,10,10.00,now(), now()),
            (3,4,10,10.00,now(), now()),
            (4,3,10,10.00,now(), now()),
            (5,2,10,10.00,now(), now());`;

      return db.query(sql, '', callback);

   }
};


module.exports = reset;