const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Listar itens
router.get('/', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Adicionar um item (Admin)
router.post('/', (req, res) => {
    const { name, price } = req.body;
    db.query('INSERT INTO items (name, price) VALUES (?, ?)', [name, price], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: results.insertId });
    });
});

module.exports = router;
