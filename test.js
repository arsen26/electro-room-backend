import pool from './src/config/db.js';

async function test() {
  try {
    const result = await pool.query('SELECT * FROM products');
    console.log(result.rows);
  } catch (err) {
    console.error('Gabim:', err);
  }
}

test();
