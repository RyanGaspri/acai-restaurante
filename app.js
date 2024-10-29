const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Importar rotas
const authRoutes = require('./routes/auth');
const pedidoRoutes = require('./routes/pedidos');
const itemRoutes = require('./routes/items');

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
