const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'sportbook',
  password: '',
  port: 5432,
});

const app = express();

app.get('/sports', (req, res) => {
  pool.query('SELECT * FROM events', (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});