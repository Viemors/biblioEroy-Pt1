const model = require("../model/livrosModel") //isso aq é o mesmo que ta no bdcontroller, pq ambos fazem a mesma coisa

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const teste = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    const result = await model.add(req.body)
    if (result) {
        req.flash('success','livro adicionado com sucesso.');
        return res.redirect('/livro');
    } else {
        req.flash('error','erro ao adicionar livro.');
        return res.redirect('/livro');
    }
}

const delet = async (req, res) => {
    await model.delet(req.params.id)
     req.flash('success','livro deletado com sucesso.');
    return res.redirect('/livro');
}

const buscar_id = async (req, res) => {
    const result = await model.buscar_id(req.params.id)
    res.status(200).json(result)
}

const atualizar = async (req, res) => {
    await model.atualizar(req.body)
    req.flash('success','livro atualizado com sucesso.');
    return res.redirect('/livro');
}



module.exports = {add, teste, buscar_id, delet, atualizar, inicio}