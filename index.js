import express from 'express';
import cors from 'cors';
import productRoutes from './src/routes/product.js';
import categoryRoutes from './src/routes/category.js';
import pool from './src/config/db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Endpoint bazë për të testuar serverin
app.get('/', (req, res) => {
  res.send('API e Electro Room po funksionon!');
});

// ✅ Endpoint për produktet
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);

// Testo lidhjen me DB
pool.connect()
  .then(() => {
    console.log('✅ Lidhja me PostgreSQL u realizua me sukses!');
    app.listen(PORT, () => {
      console.log(`🚀 Server po dëgjon në portën ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Lidhja me PostgreSQL dështoi:', err));
