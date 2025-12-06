const Sequelize = require("sequelize");

const conn = new Sequelize ("BioEroy", "root", "aluno123", {
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
  }
})

conn.authenticate()
.then(() => {
    console.log("Banco conectado")
})
.catch(() => {
    console.log("Banco não conectado")
})

module.exports = conn;