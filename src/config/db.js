import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('✅ Lidhja me PostgreSQL u realizua me sukses!'))
  .catch(err => console.error('❌ Gabim gjatë lidhjes me bazën e të dhënave:', err));

export default pool;
