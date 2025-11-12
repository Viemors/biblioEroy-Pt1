const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const cripto = require("bcrypt")

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

const addUser = async (params) => {
    const senha_cripto = await cripto.hash(params.senha_cripto, 8);
    return cadastroUser.create(params, {senha_cripto: senha_cripto})
}
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
    const senha_cripto = await cripto.hash(params.senha, 8);
    return await cadastroUser.update(
        {
            senha_cripto: senha_cripto,
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

const validacao = (senha, senha_cripto) => cripto.compare(senha, senha_cripto)


module.exports = {TodosUser, addUser, buscar_idUser, deletUser, atualizarUser, login, validacao, cadastroUser};