const model = require("../model/emprestimoModel")
const modelLivro = require("../model/livrosModel")
const modelUser = require("../model/cadastroUserModel")

const mostrarEmprestimo = async (req, res) => {
    if (req.session.admId) {
        const result = await modelUser.buscar_idUser(req.session.admId);
        if (result) {
            const {resultados} = await model.TodasSolicitacoes()
            const emprestimos = await model.buscar_LivrosADM(req.session.username);
            if (emprestimos || resultados) {
                if (Object.keys(emprestimos).length > 0 || Object.keys(resultados).length > 0) { 
                    const livros = [];
                    for (let i = 0; i<Object.keys(resultados).length; i++){
                        const livro = await modelLivro.buscar_titulo(resultados[i].titulo);
                        livros.push(livro.resultados);                
                    };
                    res.render("emprestimo/emprestimoAdm", {emprestimos, resultados,livros});
                } else {
                    req.flash("error", "Nenhum empréstimo ou solicitação encontrado.")
                    return res.redirect("/perfil/biblio");
                }
            } else {
                req.flash("error", "Deu ruim")
                return res.redirect("/perfis/perfilBiblio");
            }
        }
    } else {
        const result = await modelUser.buscar_idUser(req.session.userId);
        if (result) {
            const solicitacoes = await model.buscar_solicitacoesLeitor(req.session.username);
            const emprestimos = await model.buscar_LivrosLeitor(req.session.username);
            if (emprestimos || solicitacoes) {
                if (Object.keys(emprestimos).length > 0 || Object.keys(solicitacoes).length > 0) { 
                    res.render("emprestimo/emprestimoLeitor", {solicitacoes, emprestimos});
                
                } else {
                    req.flash("error", "Nenhum empréstimo ou solicitação encontrado.")
                    return res.redirect("/perfil/leitor");
                }
            }
        } else { //esse da certo.
                req.flash('error', "Faça login para visualizar os livros emprestados e solicitações");
                return res.redirect('/login');
            }
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
    const livro = await modelLivro.buscar(req.body)
    const Livros_emprestados = await model.Todos();
    for(let i = 0; i<Livros_emprestados.length; i++){
        if(Livros_emprestados[i].tituloLivro == livro.titulo) {
            validacao = false;
            break
        }
    }   

    if (validacao){
        try{
            let datainicial = new Date(); //inicia o objeto tipo data
            let datafinal = new Date(); //inicia o objeto tipo data
            datafinal.setDate(datainicial.getDate() + 7) //Tudo isso pra somar 7 dias
            const result = await model.add({nomeLeitor: req.body.nomeLeitor, tituloLivro: req.body.titulo, nomeAdm: req.session.username, datainicial: datainicial.toLocaleDateString(), datafinal: datafinal.toLocaleDateString()})
            if (result) {
                await model.deleteSolicitacao(req.body.titulo, req.body.nomeLeitor);
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
    await model.devolucao(req.session.username, req.body.titulo) // devolucao == delete    
    req.flash('success','Empréstimo deletado com sucesso.');
    return res.redirect("/perfil/leitor");
}

const buscar_id = async (req, res) => {
    const result = await model.buscar_id(req.params.id)
    res.status(200).json(result)
}

const atualizar = async (req, res) => {
    await model.atualizar(req.body)
     req.flash('success','Empréstimo atualizado com sucesso.');
        return res.redirect('/emprestimo');
}

const emprestimosAtrasados = async (req, res) => {
    try{
        const {resultados} = await model.buscar_LivrosLeitor(req.session.userId);
        const result = await model.emprestimosAtrasados(resultados);
        res.render("perfil/leitor", {result});
    } catch (error){
        req.flash('error', `Não foi possível buscar os empréstimos atrasados: ${error.message}`);
        return res.redirect('/perfil/leitor');
    }
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
        const solicitar = await model.solicitar(req.body.titulo, req.session.username)
        if (solicitar){
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

const buscar_solicitacoesLeitor = async (req, res) => {
    const result = await model.buscar_solicitacoesLeitor(req.session.username)
    console.log(result)
    if (result) res.render("emprestimo/emprestimoLeitor", {result});
    else {
        req.flash("error", "Deu ruim")
        return res.redirect("/perfil/leitor");
    }
}

module.exports = {add, Todos, buscar_id, delet, atualizar, inicio, mostrarEmprestimo, devolucao, emprestimosAtrasados, solicitar, buscar_solicitacoesLeitor}