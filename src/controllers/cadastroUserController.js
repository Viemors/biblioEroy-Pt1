const model = require("../model/cadastroUserModel");
const modelEmprestimo = require("../model/emprestimoModel");
const modelLivros = require("../model/livrosModel");

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const TodosUser = async (req, res) => {
    const result = await model.TodosUser()
    res.status(200).json(result);
}

//Coloquei o adm e user tudo junto porque senão teria que criar duas páginas de login e cadastro. então só aqui diferencia no js
const addUser = async (req, res) => {
    try {
        const result = await model.addUser(req.body);
        req.session.username = req.body.username;
        if (req.body.tipo_conta == "adm"){
            if (await model.validacao(req.body.senha_adm, "$2b$12$bbEewdeKF21wJ7S4.kG57en.p2BWMTDaL5DujkNMUr.aVkQEQW9ge")){ //senha_adm: 123
                req.session.admId = result.id;
                req.flash('success', 'Conta criada com sucesso.');
                return res.redirect('/perfil/biblio');
            }
            else {
                req.flash("error", "Senha de acesso incorreta."); 
                return res.redirect("/cadastro") ;
            }
        }else {
            req.session.userId = result.id;
            req.flash('success', 'Conta criada com sucesso.');
            return res.redirect('/perfil/leitor');
        }
    } 
    catch (error) {
        req.flash('error', "Usuário já cadastrado"); //Mostra o erro pra gente saber o que tá acontecendo (em inglês e erro de mysql)
        return res.redirect("/cadastro");
    }
}

const deletUser = async (req, res) => {
    try{
    if (req.session.userId) {
        await modelEmprestimo.delete_LivroUser(req.session.username) //Apaga os emprestimo 
        await modelEmprestimo.deleteSolicitacaoUser(req.session.username) //Apaga as solicitações
        await model.deletUser(req.session.userId)
    } else {
        await model.deletUser(req.session.admId)
    }
    req.flash('success', 'Conta apagada.');
    return res.redirect('/login');
    } catch (error){
        req.flash('error', `Não foi possível apagar a conta: ${error.message}`);
        return res.redirect('/login');
    }
}

const buscar_idUser = async (req, res) => {
    const result = await model.buscar_idUser(req.params.id)
    res.status(200).json(result)
}

const atualizarUser = async (req, res) => {
    console.log(req.body.email);
    if (req.body.email == ''|| req.body.username == ''|| req.body.senha == ''){
        req.flash('error','Insira todos os dados para atualização pelo botão editar.');
        return res.redirect('/perfil/leitor');
    }
    if (await model.atualizarUser(req.body)){
        req.flash('success','dados atualizados com sucesso.');
        return res.redirect('/perfil/leitor');
    } else { 
        req.flash('error','erro ao atualizar dados.');
        return res.redirect('/perfil/leitor');
    }
}

const login = async (req, res) => {
    const result = await model.login(req.body);

    if (!result) {
        // usar tipo + mensagem: primeiro argumento é o tipo (ex: 'error')
        req.flash('error','usuário não cadastrado.'); //esse flash é da extensao nova, só serve pra mandar mensagem de erro
        return res.redirect('/login'); //descobri que é paddrão usar redirect em post, put e delete, que fita hein
    }

    const validacao = await model.validacao(req.body.senha, result.senha_cripto);
    if (!validacao) {
        req.flash('error','senha incorreta.');
        return res.redirect('/login');
    }

    console.log('[login] validacao: ', validacao); //só pra eu ver se ta funcionando, tava dando bo na cripto

    if (validacao) { //verifica se a senha tá correct
        req.session.username = result.username; //mesma fita
        if (result.tipo_conta == "user") { //Separa user
            req.session.userId = result.id; //armazena o id na sessao, fazendo o cara navegar e continuar logado
            res.redirect("/perfil/leitor");
        }
        if (result.tipo_conta == "adm"){ //separa adm
            req.session.admId = result.id; //armazena o id na sessao, fazendo o cara navegar e continuar logado
            res.redirect("/perfil/biblio");        
        }

    } 
} 


//Função SAIR
const sair = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

//Tava dando erro nas rotas de perfil pq tem duas funções pra mesma coisa. Portanto só teremos uma função agora, pra adm e pra user.
const mostrarPerfil = async (req, res) => { //tava dsando erraado o result no ejs, dai fiz gambiarra rsrs
    if (!req.session.admId && !req.session.userId) {
        req.flash('error', "Faça login para ter acesso ao perfil.");
        return res.redirect('/login');
    }
    if (req.session.admId){
        const result = await model.buscar_idUser(req.session.admId);
        if (result) {
            res.render("perfis/perfilBiblio", {result});//se tiver logado, manda pro perfil
        }
        else {
            req.flash('error', "Usuário não encontrado");
            return res.redirect('/login');
        }
    } else if (req.session.userId){
        const result = await model.buscar_idUser(req.session.userId);
        if (result) {
            const resultados = await modelEmprestimo.buscar_LivrosLeitor(req.session.username); //chama a funcao pra pegar os livros do leitor logado
            const livros = []
            for(let i = 0; i < resultados.lenght; i++) { 
                const livro = await modelLivros.buscar_id(resultados[i].Idlivro);
                livros.push(livro);
            };
            const atrasos = await modelEmprestimo.emprestimosAtrasados(resultados);
            res.render("perfis/perfilLeitor", {result, livros, atrasos});//se tiver logado, manda pro perfil
        } else {
            req.flash('error', "Usuário não encontrado");
            return res.redirect('/login');
        };
    }
}

const mostrarPerfilLivro = async (req, res) => { 
    if (!req.session.userId && !req.session.admId) {
        req.flash('error', "Faça login para continuar.");
        return res.redirect('/login');
    }
        if(req.session.userId){
            const todosLivros = await modelLivros.Todos();
            res.render("perfis/perfilLivroUser", {todosLivros}); // Se for user, a página é de ver os livros
        } else res.render("perfis/perfilLivroAdm"); // Se for adm, a página é de adicionar os livros
}
module.exports = {addUser, TodosUser, buscar_idUser, deletUser, atualizarUser, inicio, login, mostrarPerfil, sair, mostrarPerfilLivro}