import { Router } from 'express';
const router = Router();
import pool from '../config/db.js';

router.post('/', async (req, res) => {
  const { cmd, id, name, description, price, stock } = req.body;

  try {
    let result;

    switch (cmd) {
      case 'insert':
        result = await pool.query(
          `INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *`,
          [name, description, price, stock]
        );
        return res.status(201).json({ message: 'Produkti u krijua', product: result.rows[0] });

      case 'update':
        if (!id) return res.status(400).json({ message: 'ID është e nevojshme për përditësim' });
        result = await pool.query(
          `UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *`,
          [name, description, price, stock, id]
        );
        if (result.rows.length === 0)
          return res.status(404).json({ message: 'Produkti nuk u gjet për përditësim' });
        return res.json({ message: 'Produkti u përditësua', product: result.rows[0] });

      case 'delete':
        if (!id) return res.status(400).json({ message: 'ID është e nevojshme për fshirje' });
        result = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0)
          return res.status(404).json({ message: 'Produkti nuk u gjet për fshirje' });
        return res.json({ message: 'Produkti u fshi me sukses' });

      default:
        return res.status(400).json({ message: 'Komanda e panjohur' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gabim në server gjatë përpunimit të komandës' });
  }
});
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    return res.json(result.rows); // Kthen të gjitha produktet si JSON
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gabim në server në marrjen e të dhënave' });
  }
});

export default router;


