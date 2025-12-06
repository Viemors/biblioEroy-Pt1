const sql = require("mysql2")

const mysql = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "aluno123",
    database: "bioEroy"
});

mysql.connect((erro) => {
    if (erro) {
        console.log("Deu ruim " + erro)
    }
    else console.log("Banco Conectado")
});

module.exports = mysql;