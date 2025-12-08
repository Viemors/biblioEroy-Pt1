const model = require("../model/emprestimoModel")
const modelLivro = require("../model/livrosModel")
const modelUser = require("../model/cadastroUserModel")

const mostrarEmprestimo = async (req, res) =>{
    if (!req.session.admId) {
        req.flash('error', "Faça login como adm para emprestar livros e pesquisar dados.");
        return res.redirect('/login'); //Somente o adm tem acesso
    }
    const result = await modelUser.buscar_idUser(req.session.admId);
    if ((result.tipo_conta == "adm")) {
        const todosUser = await modelUser.TodosUser();
        const todosLivros = await modelLivro.Todos();
        res.render("emprestimo/emprestimo", {todosUser, todosLivros});

    } else {
        res.redirect('/login');
    }
}

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const Todos = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    let validacao = true;
    const {id} = await modelLivro.buscar(req.body)
    const ids_livros = await model.Todos();
    for(let i = 0; i<ids_livros.length; i++){
        if(ids_livros[i].Idlivro == id) {
            validacao = false;
            break
        }
    }   

    if (validacao){
        try{
            let datainicial = new Date(); //inicia o objeto tipo data
            let datafinal = new Date(); //inicia o objeto tipo data
            datafinal.setDate(datainicial.getDate() + 7) //Tudo isso pra somar 7 dias
            const result = await model.add({Idleitor: req.body.idleitor, Idlivro: id, Idbiblio: req.session.admId, datainicial: datainicial.toLocaleDateString(), datafinal: datafinal.toLocaleDateString()})
            if (result) {
                req.flash('success','Livro emprestado com sucesso!');
                return res.redirect('/emprestimo');
            } else {
                req.flash('error','erro ao adicionar empréstimo.');
                return res.redirect('/emprestimo');
            }
        } catch(error){
            req.flash("error", error.message);
            return res.redirect("/emprestimo")
        }
    }
    else {
         req.flash("error", "Livro já emprestado");
         return res.redirect("/emprestimo");
    }
}
//////////////////// devolucao adm //////////////////////////
const delet = async (req, res) => {
    const Idleitor = modelUser.buscar_idUser(req.body.nome)
    const livro = await modelLivro.buscar_titulo(req.body.titulo)
    await model.devolucao(Idleitor, livro.id) // devolucao == delete
     req.flash('success','empréstimo deletado com sucesso.');
    return res.redirect('/emprestimo');
}

//////////////////// devolucao leitor //////////////////////////
const devolucao = async (req, res) => {
    const livro = await modelLivro.buscar_titulo(req.body.titulo)
    await model.devolucao(req.session.userId, livro.id) // devolucao == delete    
    req.flash('success','Empréstimo deletado com sucesso.');
    return res.redirect("/perfil/leitor");
}

const buscar_id = async (req, res) => {
    const result = await model.buscar_id(req.params.id)
    res.status(200).json(result)
}

const atualizar = async (req, res) => {
    await model.atualizar(req.query)
     req.flash('success','Empréstimo atualizado com sucesso.');
        return res.redirect('/emprestimo');
}

//solitações --------------

const solicitar = async (req, res) => { 
    let validacao = true;
    const {resultados} = await model.TodasSolicitacoes();
    for(let i = 0; i<resultados.length; i++){
        if(resultados[i].titulo == req.body.titulo) {
            validacao = false;
            break
        }
    }
    //const {id} = await modelLivro.buscar_titulo(req.body.titulo)
    
    if (validacao) {
        if (solicitar){
            const solicitar = await model.solicitar(req.body.titulo, req.session.username)
            req.flash('success','Empréstimo solicitado com sucesso.');
            return res.redirect('/perfil/livro');
        } else {
            req.flash('error','Não foi possivel solicitar o empréstimo.');
            return res.redirect('/perfil/livro');
        }
    } else {
        req.flash('error','livro já emprestado.');
        return res.redirect('/perfil/livro'); 
    }
}

const TodasSolicitacoes = async (req, res) => {
    const result = await model.TodasSolicitacoes()
    console.log(result)
    if (result) res.render("tabelaLivro/consultas", {result});
    else {
        req.flash("error", "Deu ruim")
        return res.redirect("/perfis/perfilBiblio");
    }
}

/*testeeeeeeee
const buscar_solicitacoesLeitor = async (req, res) => {
    const result = await model.buscar_solicitacoesLeitor()
    console.log(result)
    if (result) res.render("emprestimo/emprestimoLeitor", {result});
    else {
        req.flash("error", "Deu ruim")
        return res.redirect("/perfis/perfilLeitor");
    }
}*/

module.exports = {add, Todos, buscar_id, delet, atualizar, inicio, mostrarEmprestimo, devolucao, solicitar, TodasSolicitacoes}