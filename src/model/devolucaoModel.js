const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

//definindo a Tabela devolucao
// com sequelize
const devolucao = db.define("devolucao", {
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

    livroEmprestado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    leitor: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

devolucao.sync({force: true}) // Criar a tabela se não existir

//Funções do sequelize
const Todos = () => devolucao.findAll()

const add = (params) => devolucao.create(params)

const buscar_id = (id) => devolucao.findByPk(id)

const delet = async(id) => {
    await devolucao
.destroy({
        where: {
            id: id
        }
    });
}

const atualizar = async(params) => {
    await devolucao
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

module.exports = {devolucao, Todos, add, delet, buscar_id, atualizar};