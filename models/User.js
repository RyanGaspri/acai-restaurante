const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    static async create(username, senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (username, senha) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
                if (err) return reject(err);
                resolve({ id: results.insertId, username });
            });
        });
    }

    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Retorna o primeiro resultado
            });
        });
    }
}

module.exports = User;
