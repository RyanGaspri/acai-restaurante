const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'CHRIS_CINTOS', // Substitua pelo seu usuário do MySQL
    password: 'chriscorp', // Substitua pela sua senha do MySQL
    database: 'acai_restaurante'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

module.exports = db;
