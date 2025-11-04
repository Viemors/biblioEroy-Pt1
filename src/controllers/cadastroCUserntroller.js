const { buscar_idUser, deletUser, atualizarUser } = require("../model/cadastroadmModel")
const model = require("../model/cadastros/cadastroadmModel") 
const cripto = require("bcrypt")

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const Todos = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    const senha_cripto = await cripto.hash(req.body.senha, 8);
    console.log(senha_cripto)
    const result = await model.add({nome: req.body.nome, username: req.body.username, senha: senha_cripto, email: req.body.email})
    res.status(200).render("perfis/perfilLeitor", {result})
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

const login = async (req, res) => {
    const result = await model.login(req.body);
    if (result) {
        const validacao = await cripto.compare(req.body.senha, result.senha)
        if (validacao) res.render("perfis/perfilLeitor", {result});
        else res.send("senha incorreta") // Como mostrar senha incorreta já na própria página?(talvez Session)
    } else res.send("usuario não cadastrado") // Mesma coisa da senha incorreta.
}

module.exports = {addUser, TodosUser, buscar_idUser, deletUser, atualizarUser, inicio, login} 