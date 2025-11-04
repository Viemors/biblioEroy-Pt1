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
            senha_cripto: params.senha
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





////////////user////////////////////////
const cadastro_user = db.define("cadastro", {
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

cadastro_user.sync() // Criar a tabela se não existir user

//Funções do sequelize adm
const TodosUser = () => cadastro.findAll()

const addUser = (params) => cadastro.create(params)

const buscar_idUser = (id) => cadastro.findByPk(id)

const deletUser = async(id) => {
    await cadastro
.destroy({
        where: {
            id: id
        }
    });
}

const atualizarUser = async(params) => {
    await leitor
.update(
        {
            senha_cripto: params.senha
        },
        {
            where: {
                id: params.id
            }
        }
    )
}

const loginUser = async(params) => {
    const usuarios = cadastro.findOne({
        where: {username: params.username},
    })
    return usuarios;
}













module.exports = {Todos, add, delet, buscar_id, atualizar, login, cadastro_biblio,TodosUser,addUser,buscar_idUser,deletUser,atualizarUser,loginUser,cadastro_user};