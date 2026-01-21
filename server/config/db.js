const { Pool } = require('pg');
require('dotenv').config();

let pool = null;
let dbConnected = false;

// Only create pool if DATABASE_URL is provided
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  // Test connection on startup
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('❌ Database connection failed:', err.message);
      console.log('⚠️  Chat will work without history persistence');
      dbConnected = false;
    } else {
      console.log('✅ Database connected at:', res.rows[0].now);
      dbConnected = true;
    }
  });
} else {
  console.log('⚠️  DATABASE_URL not set - running without database');
}

// Helper to check if DB is available
const isConnected = () => dbConnected && pool !== null;

// Safe query that won't throw if DB is unavailable
const safeQuery = async (text, params) => {
  if (!isConnected()) {
    return { rows: [] };
  }
  return pool.query(text, params);
};

module.exports = { pool, isConnected, safeQuery };
