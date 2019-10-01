//Express framework that helps build an API
const express = require('express');
const app = express();

// To create a MySQL database connection
const mysql = require('mysql');

// Morgan is used to log incoming HTTP requests
const morgan = require('morgan');
app.use(morgan('short'));

// Use environment variables to prevent leaking database information
const dotenv = require('dotenv').config();

// Set default path 
var path = require('path');

// Read body data that is send by the client.
// Example: req.body.name
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//Express server is listining on port 3003
app.listen(3003, () => {
    console.log("Server is running on port 3003")
});

// Default API url with version number
let api_url_customer = '/shoppingcart/api/v1/customer-management';
let api_url_cart = '/shoppingcart/api/v1/cart-management';

// Root route. This show a home page.
app.get("/", (res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'));
})

// Customers API

// Get all customers
app.get(api_url_customer + "/customers", (req, res) => {

    const queryString = "SELECT * FROM customer"

    connection.query(queryString, (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: 'Database error',
                message: error
            });
        }
        return res.status(200).send(rows);
    });
})

// Get customer by id
app.get(api_url_customer + "/customers/:id", (req, res) => {

    let customer_id = req.params.id;

    const queryString = "SELECT * FROM customer where customer_id=?"

    if (!customer_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide customer id'
        });
    }

    connection.query(queryString, customer_id, (error, rows) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: 'Database error',
                message: error
            });
        }
        return res.status(200).send(rows);
    });
})

// Create new customer
app.post(api_url_customer + "/customers", (req, res) => {

    console.log(req.body)

    const queryString = 'INSERT INTO customer SET name = ?, email = ?, city = ?, zipcode = ?, street = ?, house_number = ?, addition = ?, lc_dt = NOW(), cr_dt = NOW()'

    connection.query(queryString, [req.body.name, req.body.email, req.body.city, req.body.zipcode, req.body.street, req.body.house_number, req.body.addition], (error) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: 'Database error',
                message: error
            });
        }
        return res.status(200).send({
            message: 'Customer has been succesfully created.'
        });
    });
})

//Update customer by id
app.put(api_url_customer + "/customers", (req, res) => {

    const queryString = 'UPDATE customer SET name = ?, email = ?, city = ?, zipcode = ?, street = ?, house_number = ?, addition = ?, lc_dt = NOW() where customer_id = ?'

    connection.query(queryString, [req.body.name, req.body.email, req.body.city, req.body.zipcode, req.body.street, req.body.house_number, req.body.addition, req.body.customer_id], (error) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: 'Database error',
                message: error
            });
        }
        return res.status(200).send({
            message: 'Customer has been succesfully updated.'
        });
    });
})

//Delete customer by id
app.delete(api_url_customer + "/customers/:id", (req, res) => {

    let customer_id = req.params.id;

    const queryString = 'DELETE FROM customer WHERE customer_id = ?'

    if (!customer_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide customer id'
        });
    }

    connection.query(queryString, customer_id, (error) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: 'Database error',
                message: error
            });
        }
        return res.status(200).send({
            message: 'Customer has been succesfully deleted.'
        });
    });
})


// Cart API

// TODO