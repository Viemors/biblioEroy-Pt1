const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

////////////user////////////////////////
const cadastroUser = db.define("cadastro", {
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

cadastroUser.sync() // Criar a tabela se não existir user

//Funções do sequelize adm
const TodosUser = () => cadastroUser.findAll()

const addUser = (params) => cadastroUser.create(params)

const buscar_idUser = (id) => cadastroUser.findByPk(id)

const deletUser = async(id) => {
    await cadastroUser
.destroy({
        where: {
            id: id
        }
    });
}

const atualizarUser = async(params) => {
    await cadastroUser
.update(
        {
            senha_cripto: params.senha,
            email: params.email,
            username: params.username
        },
        {
            where: {
                nome: params.nome
            }
        }
    )
}

const login = async(params) => {
    const usuarios = cadastroUser.findOne({
        where: {username: params.username},
    })
    return usuarios;
}



module.exports = {TodosUser, addUser, buscar_idUser, deletUser, atualizarUser, login, cadastroUser};