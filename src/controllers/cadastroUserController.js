const model = require("../model/cadastroUserModel")
const init = require("../controllers/initialController")
const cripto = require("bcrypt")

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const TodosUser = async (req, res) => {
    const result = await model.TodosUser()
    res.status(200).json(result);
}

const addUser = async (req, res) => {
    const senha_cripto = await cripto.hash(req.body.senha_cripto, 8);
    console.log(senha_cripto)
    const result = await model.addUser({nome: req.body.nome, username: req.body.username, senha_cripto: senha_cripto, email: req.body.email})
    init.perfil_leitor()
}

const deletUser = async (req, res) => {
    await model.deletUser(req.params.id)
    res.status(200).send("Apagado com sucesso")
}

const buscar_idUser = async (req, res) => {
    const result = await model.buscar_idUser(req.params.id)
    res.status(200).json(result)
}

const atualizarUser = async (req, res) => {
    await model.atualizarUser(req.body)
    res.status(200).send("Atualizado")
}

const login = async (req, res) => {
    const result = await model.login(req.body);
    if (result) {
        const validacao = await cripto.compare(req.body.senha, result.senha_cripto)
        if (validacao) init.perfil_leitor();
        else res.send("senha incorreta") // Como mostrar senha incorreta já na própria página?(talvez Session)
    } else res.send("usuario não cadastrado") // Mesma coisa da senha incorreta.
}

module.exports = {addUser, TodosUser, buscar_idUser, deletUser, atualizarUser, inicio, login} 