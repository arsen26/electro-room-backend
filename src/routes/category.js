import { Router } from "express";
import pool from "../config/db.js";
const router = Router();

router.post('/', async (req, res) => {
    const { cmd, category_id, category_name, category_description, category_type } = req.body;

    try {
        let result;

        switch (cmd) {
            case 'update':
                if (!category_id) return res.status(400).json({ message: 'ID është e nevojshme për përditësim' });
                result = await pool.query(
                    `UPDATE category SET category_name = $1, category_description = $2, category_type = $3 WHERE category_id = $4 RETURNING *`,
                    [category_name, category_description, category_type, category_id]
                );
                if (result.rows.length === 0)
                    return res.status(404).json({ message: 'Kategoria nuk u gjet për përditësim' });
                return res.json({ message: 'Kategoria u përditësua', category: result.rows[0] });               
            default:
                return res.status(400).json({ message: 'Komanda e panjohur' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gabim në server' });
    }
});
 // DELETE për fshirje të një kategorie
router.delete('/', async (req, res) => {
  const { category_id } = req.body;

  if (!category_id) {
    return res.status(400).json({ message: 'ID është e nevojshme për fshirje' });
  }

  try {
    const result = await pool.query(
      `DELETE FROM category WHERE category_id = $1 RETURNING *`,
      [category_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kategoria nuk u gjet për fshirje' });
    }

    return res.json({ message: 'Kategoria u fshi me sukses' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gabim në server gjatë fshirjes' });
  }
});

      router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category');
    return res.json(result.rows); // Kthen të gjitha produktet si JSON
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gabim në server në marrjen e të dhënave' });
  }
});          

export default router;
