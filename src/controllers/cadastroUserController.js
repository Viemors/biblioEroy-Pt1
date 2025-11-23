const model = require("../model/cadastroUserModel")

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
            req.session.admId = result.id;
            return res.redirect('/perfil/biblio');
        }
        else {
            req.session.userId = result.id;
            return res.redirect('/perfil/leitor');
    }
    } 
    catch (error) {
        res.json(error); //Mostra o erro pra gente saber o que tá acontecendo
    }
}

const deletUser = async (req, res) => {
    const deletar = await model.deletUser(req.session.userId)
    if(!deletar){
        req.flash('success','conta apagada.');
        return res.redirect('/');}
    else {
        res.status(400).send("Não foi possível concluir a ação")    
    }
}

const buscar_idUser = async (req, res) => {
    const result = await model.buscar_idUser(req.params.id)
    res.status(200).json(result)
}

const atualizarUser = async (req, res) => {
    if (await model.atualizarUser(req.body)){
        res.status(200).send("Atualizado")
    } else { 
        res.status(400).send("Não atualizado")
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

    } else {
        req.flash('error','senha incorreta.');
        return res.redirect('/login');
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

const mostrarEmprestimo = async (req, res) =>{
    if (!req.session.admId) {
        return res.redirect('/login'); //Somente o adm tem acesso
    }
    const result = await model.buscar_idUser(req.session.admId);
    if ((result.tipo_conta == "adm")) {
        const todos = await model.TodosUser();
        res.render("emprestimo/emprestimo", { todos });

    } else {
        res.redirect('/login');
    }
}


module.exports = {addUser, TodosUser, buscar_idUser, deletUser, atualizarUser, inicio, login, mostrarPerfilLeitor, sair, mostrarPerfilBiblio, mostrarPerfilLivro, mostrarEmprestimo} 