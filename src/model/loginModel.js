const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

//definindo a Tabela cadastro
// com sequelize
const cadastro = db.define("cadastro", {
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
    },
    nome: {
            type: Sequelize.STRING,
            allowNull: false
        },

    email: {
            type: Sequelize.STRING,
            allowNull: false
        },

    Usuario: {
            type: Sequelize.STRING,
            allowNull: false
        },
    senha: {
            type: Sequelize.STRING,
            allowNull: false
        }
})

cadastro.sync({force: true}) // Criar a tabela se não existir

//Funções do sequelize
const Todos = () => cadastro.findAll()

const add = (params) => cadastro.create(params)

const buscar_id = (id) => cadastro.findByPk(id)

const delet = async(id) => {
    await cadastro
.destroy({
        where: {
            id: id
        }
    });
}

const atualizar = async(params) => {
    await leitor
.update(
        {
            senha: params.senha
        },
        {
            where: {
                id: params.id
            }
        }
    )
}

module.exports = {cadastro, Todos, add, delet, buscar_id, atualizar};