const model = require("../model/livrosModel") //isso aq é o mesmo que ta no bdcontroller, pq ambos fazem a mesma coisa
const modelEmprestimo = require("../model/emprestimoModel")
const modelUser = require("../model/cadastroUserModel")

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const teste = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    if (!req.body.descricao) delete req.body.descricao;//remove o campo vazio pra aparecer "sem descrição" no sequelize
    if (!req.body.imagem) delete req.body.imagem; //remove o campo vazio pra aparecer "sem imagem" no sequelize
    const result = await model.add(req.body)
    if (result) {
        req.flash('success','livro adicionado com sucesso.');
        return res.redirect('/perfil/livro');
    } else {
        req.flash('error','erro ao adicionar livro.');
        return res.redirect('/perfil/livro');
    }
}

const delet = async (req, res) => {
    await model.delet(req.params.id)
     req.flash('success','livro deletado com sucesso.');
    return res.redirect('/livro');
}

//Buscar por alguma coisa
const buscar = async (req, res) => {
    if (!req.body.tipo){ 
        req.flash("error", "Selecione um tipo para busca.")
        return res.redirect("/emprestimo");
    }
    if (req.body.tipo == "titulo") {
       try{
          const result = await model.buscar_titulo(req.body.busca);
          res.render("tabelaLivro/consultas", {result});
    } catch(error){
        req.flash("error", "Titulo não encontado.")
        return res.redirect("/emprestimo");
    }
    }
    if (req.body.tipo == "categoria") {
        try {
           const result = await model.buscar_categoria(req.body.busca);
           res.render("tabelaLivro/consultas", {result});
           if (!result) {
            req.flash("error", "Categoria não encontrada.")
            return res.redirect("/emprestimo");
           }
    } catch(error){
        req.flash("error", error.message)
        return res.redirect("/emprestimo");
    }
    }
    if (req.body.tipo == "autor") {
       try{
            const result = await model.buscar_autor(req.body.busca);
            if (result.resultados.length == 0) {
                req.flash("error", "autor não encontrado.")
                return res.redirect("/emprestimo");
           }
           res.render("tabelaLivro/consultas", {result});
    } catch(error){
        req.flash("error", error.message)
        return res.redirect("/emprestimo");
    }
    }
    if (req.body.tipo == "leitor") {
        if (await modelUser.buscar_nome(req.body.busca)){
            const result = await modelEmprestimo.buscar_LivrosLeitor(req.body.busca);
            res.render("tabelaLivro/consultas", {result});
    } else {
        req.flash("error", "Leitor não encontado.")
        return res.redirect("/emprestimo");
    }
    }
}

const atualizar = async (req, res) => {
    await model.atualizar(req.body)
    req.flash('success','livro atualizado com sucesso.');
    return res.redirect('/livro');
}

const mostrar = async (req, res) => {
    const result = await model.mostrarDados();
    if (result) res.render("tabelaLivro/tabelaLivro", {result});
    else {
        req.flash("error", "Deu ruim")
        return res.redirect("/perfis/perfilLivro");
    }
}


module.exports = {add, teste, buscar, delet, atualizar, inicio, mostrar}