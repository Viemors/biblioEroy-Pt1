const model = require("../model/cadastroUserModel");
const modelEmprestimo = require("../model/emprestimoModel");

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
        req.session.username = result.username;
        if (result.tipo_conta == "adm"){
            if (await model.validacao(req.body.senha_adm, "$2b$12$bbEewdeKF21wJ7S4.kG57en.p2BWMTDaL5DujkNMUr.aVkQEQW9ge")){
                req.session.admId = result.id;
                req.flash('success', 'Conta criada com sucesso.');
                return res.redirect('/perfil/biblio');
            }
            else {
                req.flash("error", "Senha de acesso incorreta."); 
                return res.redirect("/cadastro") ;
            }
        }
        else {
            req.session.userId = result.id;
            req.flash('success', 'Conta criada com sucesso.');
            return res.redirect('/perfil/leitor');
    }
    } 
    catch (error) {
        req.flash('error', error.errors[0].message); //Mostra o erro pra gente saber o que tá acontecendo (em inglês e erro de mysql)
        return res.redirect("/cadastro");
    }
}

const deletUser = async (req, res) => {
    await modelEmprestimo.delete_LivroUser(req.session.userId) //Apaga os emprestimo 
    const deletar = await model.deletUser(req.session.userId)
    if (deletar) { // deleted === 1
        req.flash('success', 'Conta apagada.');
        return res.redirect('/');
    } else {
        req.flash('error', 'Não foi possível apagar a conta.');
        return res.redirect('/perfil/leitor');
    }
}

const buscar_idUser = async (req, res) => {
    const result = await model.buscar_idUser(req.params.id)
    res.status(200).json(result)
}

const atualizarUser = async (req, res) => {
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

const mostrarPerfilLeitor = async (req, res) => { //tava dsando erraado o result no ejs, dai fiz gambiarra rsrs
    if (!req.session.userId) {
        return res.redirect('/login'); //se nao tiver userId na sessao, redireciona pro login
    }
    const result = await model.buscar_idUser(req.session.userId);
    if (result) {
        res.render("perfis/perfilLeitor", { result });//se tiver logado, manda pro perfil
    } else {
        req.session.destroy(() => {
        res.redirect('/login');
        });
    }
}

const sair = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

//TEMPORÀRIO
const mostrarPerfilBiblio = async (req, res) => { //tava dsando erraado o result no ejs, dai fiz gambiarra rsrs
    if (!req.session.admId) {
        return res.redirect('/login'); //se nao tiver id na sessao, redireciona pro login
    }
    const result = await model.buscar_idUser(req.session.admId);
    if ((result.tipo_conta == "adm")) {
        res.render("perfis/perfilBiblio", { result });//se tiver logado, manda pro perfil

    } else {
        req.session.destroy(() => {
        res.redirect('/login');
        });
    }
}

const mostrarPerfilLivro = async (req, res) => { 
    if (!req.session.admId) {
        return res.redirect('/login'); //Somente o adm tem acesso
    }
    const result = await model.buscar_idUser(req.session.admId);
    if ((result.tipo_conta == "adm")) {
        const todos = await model.TodosUser();
        res.render("perfis/perfilLivro", { todos });

    } else {
        res.redirect('/login');
    }
}


module.exports = {addUser, TodosUser, buscar_idUser, deletUser, atualizarUser, inicio, login, mostrarPerfilLeitor, sair, mostrarPerfilBiblio, mostrarPerfilLivro} 