const db = require('../config/db');

class Pedido {
    static async create(userId, itemId) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO pedidos (userId, itemId) VALUES (?, ?)', [userId, itemId], (err, results) => {
                if (err) return reject(err);
                resolve({ id: results.insertId, userId, itemId });
            });
        });
    }

    static async findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM pedidos WHERE status != "entregue"', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE pedidos SET status = ? WHERE id = ?', [status, id], (err) => {
                if (err) return reject(err);
                resolve({ message: 'Status atualizado com sucesso' });
            });
        });
    }
}

module.exports = Pedido;
