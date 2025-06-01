import { Router } from 'express';
const router = Router();
import pool from '../config/db.js';

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim në server' });
  }
});

export default router;