const express = require("express")
const rota = express.Router()

const controller = require("../controllers/bdcontroller")

rota.get("/mostrar", controller.teste)
rota.get("/add", controller.add)
rota.get("/delete/:id", controller.delet)
rota.get("/buscar/:id", controller.buscar_id)
rota.get("/atualizar", controller.atualizar)

module.exports = rota