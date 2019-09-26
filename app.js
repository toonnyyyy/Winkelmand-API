const express = require('express')
const app = express()
const mysql = require('mysql')
const morgan = require('morgan')
const dotenv = require('dotenv').config();

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

// Root route
app.get("/", (req, res) => {
    res.send("Hoofd route")
})

app.get("/klanten", (req, res) => {
    const queryString = "SELECT * FROM klanten"
    connection.query(queryString, (error, rows, fields) => {
        if (error) {
            console.log("Fout bij het ophalen van klant gegevens: " + error)
            res.sendStatus(500)
            return
        }

        res.json(rows)
        console.log(error)
        console.log('test')
    })
})