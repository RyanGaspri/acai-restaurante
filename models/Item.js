const db = require('../config/db');

class Item {
    static async findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM items', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async create(name, price) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO items (name, price) VALUES (?, ?)', [name, price], (err, results) => {
                if (err) return reject(err);
                resolve({ id: results.insertId, name, price });
            });
        });
    }
}

module.exports = Item;
