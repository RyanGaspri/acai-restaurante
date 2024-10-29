const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// Registro de usuários (Atendentes)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, senha) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: results.insertId, username });
    });
});

// Login de usuários (Atendentes)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.senha);
        if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
