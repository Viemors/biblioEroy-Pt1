const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const modelLeitor = require("../model/cadastroUserModel")
const bd = require("../config/bd")

//definindo a Tabela emprestimo
// com sequelize
const emprestimo = db.define("emprestimo", {
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
    },
    datainicial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datafinal: {
        type: Sequelize.STRING,
        allowNull: false
    },

    tituloLivro: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    nomeLeitor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nomeAdm: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

emprestimo.sync() // Criar a tabela se não existir

//Funções do sequelize
const Todos = () => emprestimo.findAll()

const add = async (params) => await emprestimo.create(params)

const buscar_id = (id) => emprestimo.findByPk(id)

const buscar_LivrosLeitor = async (leitor) => { //essa aq já nao funciona, nao tem emprestimo nenhum
    const result = await bd.promise().query(`SELECT * FROM emprestimos WHERE emprestimos.nomeLeitor = '${leitor}'`)//tanto que aq ta errado
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})

    return result;
}

const buscar_LivrosADM = async (biblio) => await emprestimo.findAll({
    where:{
        nomeAdm: biblio
    }
})


const delete_LivroUser = async (username) => {
    await emprestimo.destroy({
        where: {nomeLeitor: username}
    });
}

const devolucao = async(nomeLeitor, tituloLivro) => {
    await emprestimo
.destroy({
        where: {
            nomeLeitor: nomeLeitor, tituloLivro: tituloLivro
        }
    });
}

const atualizar = async(params) => {
    const data = new Date(params.datafinal.split('/')[2], params.datafinal.split('/')[1] - 1, params.datafinal.split('/')[0]); //Corta a string e converte em date
    data.setDate(data.getDate() + 7)
    await emprestimo
.update(
        {
             datafinal: data.toLocaleDateString()
        },
        {
            where: {
                tituloLivro: params.titulo
            }
        }
    )
}

const emprestimosAtrasados = async (todos) => {
    const atual = new Date();
    const atrasados = [];
    for (let i = 0; i<todos.length; i++) {
        let data_emprestimo = new Date(todos[i].datafinal.split('/')[2], todos[i].datafinal.split('/')[1] - 1, todos[i].datafinal.split('/')[0]); //Corta a string e converte em date
        if (data_emprestimo <= atual) {
            atrasados.push(todos[i])
        }
    }
    return atrasados;
}


//Solicitar Emprestimo -------------------
const solicitacoes = db.define("solicitacoes", {
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    titulo: {
            type: Sequelize.STRING,
            allowNull: false
    }
})

solicitacoes.sync()

const solicitar = async(titulo, username) => {return solicitacoes.create(
        {
            titulo: titulo,
            username: username
        }
    )
}

const TodasSolicitacoes = async () => await bd.promise().query(`SELECT * FROM solicitacoes`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})

const deleteSolicitacaoUser = async (username) => {
    await solicitacoes.destroy({
        where: {username: username}
    });
}

const buscar_solicitacoesLeitor = async (leitor) => { 
    const result = await bd.promise().query(`SELECT * FROM solicitacoes WHERE username = '${leitor}'`) //faltava aspas T-T
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})

    return result;
}

const deleteSolicitacao = async (titulo, leitor) => {
    await solicitacoes.destroy({
        where: {titulo: titulo, username: leitor}
    }

    )
}

module.exports = {Todos, add, devolucao, buscar_id, atualizar, buscar_LivrosLeitor, delete_LivroUser,emprestimosAtrasados, solicitar, TodasSolicitacoes, deleteSolicitacaoUser, buscar_solicitacoesLeitor, buscar_LivrosADM, deleteSolicitacao};