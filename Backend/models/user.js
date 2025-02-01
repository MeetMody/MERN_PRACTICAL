const db = require('../config/db');

const User = {
  findByEmail: async (email) => {
    if (!email) return null;
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (firstName, lastName, email, password, role) => {
    if (!firstName || !lastName || !email || !password || !role) return null;
    const [result] = await db.execute(
      'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, password, role]
    );
    return result.insertId;
  }
};

module.exports = User;
