const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

const cadastro_biblio = db.define("cadastro", {
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

    username: {
            type: Sequelize.STRING,
            allowNull: false
        },
    senha_cripto: {
            type: Sequelize.STRING,
            allowNull: false
        }
})

cadastro_biblio.sync() // Criar a tabela se não existir adm



//////////////////Funções do sequelize adm/////////////////////////////
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
            senha_cripto: params.senha_cripto
        },
        {
            where: {
                id: params.id
            }
        }
    )
}

const login = async(params) => {
    const usuarios = cadastro.findOne({
        where: {username: params.username},
    })
    return usuarios;
}

module.exports = {Todos, add, delet, buscar_id, atualizar, login, cadastro_biblio};