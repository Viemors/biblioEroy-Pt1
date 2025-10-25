const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

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

    livroEmprestado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    leitor: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

emprestimo.sync() // Criar a tabela se não existir

//Funções do sequelize
const Todos = () => emprestimo.findAll()

const add = (params) => emprestimo.create(params)

const buscar_id = (id) => emprestimo.findByPk(id)

const delet = async(id) => {
    await emprestimo
.destroy({
        where: {
            id: id
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

module.exports = {emprestimo, Todos, add, delet, buscar_id, atualizar};