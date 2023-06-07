require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.post('/api/customers', (req, res) => {
  const { name, lastName, email } = req.body;
  pool.query('INSERT INTO customer (name, last_name, email) VALUES (?, ?, ?)', [name, lastName, email], function(error, results) {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Customer created');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
