const model = require("../model/cadastroadmModel") 
const cripto = require("bcrypt")

const inicio = (req, res) =>  {
    res.json({Ver_todos: "/mostrar", delete: "/delete:id(o que tu quiser, mas que exista na tabela)", buscar_ID: "/buscar:id(o que tu quiser, mas que exista na tabela)", Adicionar: "/add?titulo=titulo(que tu quiser, sem aspas)&autor=autor(que tu quiser, sem aspas)", atualizar: "/atualizar?id=num(que quer mudar)&titulo=Titulo(novo)&autor=autor(novo)"})
}

//SEQUELIZE
const Todos = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    const senha_cripto = await cripto.hash(req.body.senha, 8);
    console.log(senha_cripto)
    const result = await model.add({nome: req.body.nome, username: req.body.username, senha: senha_cripto, email: req.body.email})
    res.status(200).render("perfis/perfilLeitor", {result})
}

const delet = async (req, res) => {
    await model.delet(req.params.id)
    res.status(200).send("Apagado com sucesso")
}

const buscar_id = async (req, res) => {
    const result = await model.buscar_id(req.params.id)
    res.status(200).json(result)
}

const atualizar = async (req, res) => {
    await model.atualizar(req.query)
    res.status(200).send("Atualizado")
}

const login = async (req, res) => {
    const result = await model.login(req.body);

    if (!result) {
        // enviar como tipo 'error' e uma mensagem
        req.flash('error','Usuário não cadastrado.'); //esse flash é da extensao nova, só serve pra mandar mensagem de erro
        return res.redirect('/login'); //descobri que é paddrão usar redirect em post, put e delete, que fita hein
    }

    const validacao = await model.validacao(req.body.senha, result.senha_cripto);
    console.log('[login] validacao: ', validacao); //só pra eu ver se ta funcionando, tava dando bo na cripto

    if (validacao) { //verifica se a senha tá correct
        req.session.Id = result.id; //armazena o id na sessao, fazendo o cara navegar e continuar logado
        req.session.username = result.username; //mesma fita
        return res.redirect('/perfilBiblio');

    } else {
        req.flash('error','Senha incorreta.');
        return res.redirect('/login');
    }
} 

const mostrarPerfilBiblio = async (req, res) => { //tava dsando erraado o result no ejs, dai fiz gambiarra rsrs
    if (!req.session.Id) {
        return res.redirect('/login'); //se nao tiver id na sessao, redireciona pro login
    }
    const result = await model.buscar_id(req.session.Id);
    if ((result.tipo_conta == "adm")) { //Confirma se é adm
        res.render("perfis/perfilBiblio", { result });//se tiver logado, manda pro perfil

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

module.exports = {add, Todos, buscar_id, delet, atualizar, inicio, login, mostrarPerfilBiblio, sair}