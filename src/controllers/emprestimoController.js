const model = require("../model/emprestimoModel")
const modelLivro = require("../model/livrosModel")
const modelUser = require("../model/cadastroUserModel")

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const Todos = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    let datainicial = new Date(); //inicia o objeto tipo data
    let datafinal = new Date(); //inicia o objeto tipo data
    datafinal.setDate(datainicial.getDate() + 7) //Tudo isso pra somar 7 dias
    const {id} = await modelLivro.buscar(req.body)
    const result = await model.add({Idleitor: req.body.idleitor, Idlivro: id, Idbiblio: req.session.admId, datainicial: datainicial, datafinal: datafinal})
    if (result) {
        res.status(200).redirect("/emprestimo")
    } else {
        req.flash('error','erro ao adicionar empréstimo.');
        return res.redirect('/emprestimo');
    }
}

const delet = async (req, res) => {
    const Idleitor = modelUser.buscar_idUser(req.body.nome)
    await model.delet(Idleitor, req.body.titulo)
     req.flash('success','empréstimo deletado com sucesso.');
    return res.redirect('/emprestimo');
}

const buscar_id = async (req, res) => {
    const result = await model.buscar_id(req.params.id)
    res.status(200).json(result)
}

const atualizar = async (req, res) => {
    await model.atualizar(req.query)
     req.flash('success','empréstimo atualizado com sucesso.');
        return res.redirect('/emprestimo');
}




module.exports = {add, Todos, buscar_id, delet, atualizar, inicio}