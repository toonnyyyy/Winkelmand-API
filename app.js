const express = require('express')
const app = express()
const mysql = require('mysql')
const morgan = require('morgan')
const dotenv = require('dotenv').config();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('short'))

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

//Express server op port 3003
app.listen(3003, () => {
    console.log("Server is running on port 3003")
})

let api_url = '/shoppingcart/api/v1'

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'));
})

// Get all customers
app.get(api_url + "/customers", (req, res) => {

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
app.get(api_url + "/customers/:id", (req, res) => {

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
app.post(api_url + "/customers", (req, res) => {

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
app.put(api_url + "/customers", (req, res) => {

    console.log(req.body)

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
            message: 'Customer has been succesfully updatet.'
        });
    });
})

//Delete customer by id
app.delete(api_url + "/customers/:id", (req, res) => {

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