const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const cripto = require("bcrypt")

////////////user////////////////////////
const cadastroUser = db.define("cadastros", {
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
            allowNull: false,
            unique: true
        },

    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha_cripto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_conta: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

cadastroUser.sync() // Criar a tabela se não existir user

//Funções do sequelize user
const TodosUser = () => cadastroUser.findAll({
    where: {tipo_conta: "user"} 
})

const addUser = async (params) => {
    const senha_cripto = await cripto.hash(params.senha_cripto, 8)
    params.senha_cripto = senha_cripto; // substitui a senha normie pela criptografada
    const resultado = await cadastroUser.create(params);
    return resultado;
}
const buscar_idUser = async (id) => await cadastroUser.findByPk(id)

const buscar_nome = async (nome) => await cadastroUser.findOne({
    where: { username: nome}
})
const buscar_username = async (username) => await cadastroUser.findOne({
    where: { username: username}
})

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
    const usuarios = await cadastroUser.findOne({ //faltava um await, dai tava retornando uma promise
        where: {username: params.username},
    });
    return usuarios;
}

const validacao = (senha, senha_cripto) => cripto.compare(senha, senha_cripto)


module.exports = {TodosUser, addUser, buscar_idUser, buscar_username, deletUser, atualizarUser, login, validacao, buscar_nome, cadastroUser};