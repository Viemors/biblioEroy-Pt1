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

    Idlivro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    Idleitor: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Idbiblio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

emprestimo.sync() // Criar a tabela se não existir

//Funções do sequelize
const Todos = () => emprestimo.findAll()

const add = async (params) => await emprestimo.create(params)

const buscar_id = (id) => emprestimo.findByPk(id)

const buscar_LivrosLeitor = async (leitor) => { 
    const user = await modelLeitor.buscar_nome(leitor);
    const result = await bd.promise().query(`SELECT * FROM emprestimos WHERE emprestimos.Idleitor = ${user.id}`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})

    return result;
}

const delete_LivroUser = async (id) => {
    await emprestimo.destroy({
        where: {Idleitor: id}
    });
}

const devolucao = async(id_leitor, id_livro) => {
    await emprestimo
.destroy({
        where: {
            Idleitor: id_leitor, Idlivro: id_livro
        }
    });
}

const atualizar = async(params) => {
    await emprestimo
.update(
        {
             datafinal: params.datafinal
        },
        {
            where: {
                id: params.id
            }
        }
    )
}

const emprestimosAtrasados = async (todos) => {
    const atual = new Date(2025, 11, 16, 0, 0, 0);
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

//const TodasSolicit = () => solicitacoes.findAll()

const TodasSolicitacoes = async (solicitacoes) => await bd.promise().query(`SELECT * FROM solicitacoes`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})

const deleteSolicitacaoUser = async (username) => {
    await solicitacoes.destroy({
        where: {username: username}
    });
}

/*testeeeeee
    const buscar_solicitacoesLeitor = async (leitor) => { 
    const user = await modelLeitor.buscar_nome(leitor);
    const result = await bd.promise().query(`SELECT * FROM emprestimos WHERE emprestimos.Idleitor = ${user.id}`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})

    return result;
}*/

module.exports = {Todos, add, devolucao, buscar_id, atualizar, buscar_LivrosLeitor, delete_LivroUser,emprestimosAtrasados, solicitar, TodasSolicitacoes, deleteSolicitacaoUser};