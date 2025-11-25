const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const modelLeitor = require("../model/cadastroUserModel")

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
        type: Sequelize.DATE,
        allowNull: false
    },
    datafinal: {
        type: Sequelize.DATE,
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
    const result = await emprestimo.findAll({
        where: {Idleitor: parseInt(user.id)}
    })
    return result;
}

const delete_LivroUser = async (id) => {
    await emprestimo.destroy({
        where: {Idleitor: id}
    });
}

const devolucao = async(id, titulo) => {
    await emprestimo
.destroy({
        where: {
            Idleitor: id, titulo: titulo
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

module.exports = {emprestimo, Todos, add, devolucao, buscar_id, atualizar, buscar_LivrosLeitor, delete_LivroUser};