const model = require("../model/emprestimoModel")

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const Todos = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    await model.add(req.query)
    res.status(200).send("Cadastrado")
}

const delet = async (req, res) => {
    await model.delet(req.params.id)
    res.status(200).send("Apagado com sucesso")
}

const buscar_id = async (req, res) => {
    const result = await model.buscar_id(req.params.id)
    res.status(200).json(result)
}

const atualizar = async (req, res) => {
    await model.atualizar(req.query)
    res.status(200).send("Atualizado")
}




module.exports = {add, Todos, buscar_id, delet, atualizar, inicio}