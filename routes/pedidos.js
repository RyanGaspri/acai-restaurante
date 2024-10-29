const express = require('express');
const Pedido = require('../models/Pedido');

const router = express.Router();

// Criar um pedido
router.post('/', async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        const pedido = await Pedido.create(userId, itemId);
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Listar pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Alterar o status do pedido
router.put('/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const result = await Pedido.updateStatus(req.params.id, status);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
