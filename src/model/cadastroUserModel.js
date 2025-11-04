const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

////////////user////////////////////////
const cadastro_user= db.define("cadastro_user", {
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
const TodosUser = () => cadastro_user.findAll()

const addUser = (params) => cadastro_user.create(params)

const buscar_idUser = (id) => cadastro_user.findByPk(id)

const deletUser = async(id) => {
    await cadastro_user
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
    const usuarios = await cadastro_user.findOne({
        where: {username: params.username},
    })
    return usuarios;
}

module.exports= {TodosUser,addUser,buscar_idUser,deletUser,atualizarUser,loginUser,cadastro_user};