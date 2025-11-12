const model = require("../model/cadastroUserModel")

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const TodosUser = async (req, res) => {
    const result = await model.TodosUser()
    res.status(200).json(result);
}

const addUser = async (req, res) => {
    const result = await model.addUser(req.body)
    res.render("perfis/perfilLeitor", {result})
}

const deletUser = async (req, res) => {
    if(await model.deletUser(req.params.id))
        res.status(200).send("Apagado com sucesso")
    else res.status(400).send("Não foi possível concluir a ação")    
}

const buscar_idUser = async (req, res) => {
    const result = await model.buscar_idUser(req.params.id)
    res.status(200).json(result)
}

const atualizarUser = async (req, res) => {
    if(await model.atualizarUser(req.body))
        res.status(200).send("Atualizado")
    else res.status(400).send("Não atualizado")
}

const login = async (req, res) => {
    const result = await model.login(req.body);
    if (result) {
        const validacao = await model.validacao(req.body.senha, result.senha_cripto);
        if (validacao) {
            res.render("perfis/perfilLeitor", {result});}
        else res.send("senha incorreta") // Como mostrar senha incorreta já na própria página?(talvez Session)
    } else res.send("usuario não cadastrado") // Mesma coisa da senha incorreta.
}

module.exports = {addUser, TodosUser, buscar_idUser, deletUser, atualizarUser, inicio, login} 