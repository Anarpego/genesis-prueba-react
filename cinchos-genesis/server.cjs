const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { ulid } = require('ulid');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post('/api/customers', async (req, res) => {
  const { name, lastName, email } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO customer (name, last_name, email) VALUES (?, ?, ?)', [name, lastName, email]);
    res.status(200).json({ customerId: result.insertId, message: 'Customer created' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/api/orders', async (req, res) => {
  const { customerId, color, quantity } = req.body;
  try {
    const priceMap = { black: 30, white: 35, red: 40 };
    const colorMap = { black: 1, white: 2, red: 3 };
    const unitPrice = priceMap[color];
    const beltColor = colorMap[color];
    const pricing = quantity * unitPrice;
    const invoiceNumber = `${Date.now()}-${ulid()}`;

    await pool.query('START TRANSACTION');

    const [beltResult] = await pool.query(
      'INSERT INTO belt (color) VALUES (?)',
      [beltColor]
    );
    const beltId = beltResult.insertId;

    const [invoiceResult] = await pool.query(
      'INSERT INTO invoice (customer_id, belt_id, invoice_number, pricing) VALUES (?, ?, ?, ?)',
      [customerId, beltId, invoiceNumber, pricing]
    );

    await pool.query('INSERT INTO item (invoice_id, belt_id, color, quantity, unit_price) VALUES (?, ?, ?, ?, ?)', [
      invoiceResult.insertId,
      beltId,
      beltColor,
      quantity,
      unitPrice,
    ]);

    await pool.query('COMMIT');

    res.status(200).json({ invoiceNumber, message: 'Order created' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
