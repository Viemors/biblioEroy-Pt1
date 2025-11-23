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
        },
    tipo_conta: {
        type: Sequelize.STRING,
        allowNull: false
    } 
})

cadastro_biblio.sync({force: true}) // Criar a tabela se não existir adm



//////////////////Funções do sequelize adm/////////////////////////////
const Todos = () => cadastro_biblio.findAll()

const add = async (params) => {
    const senha_cripto = await cripto.hash(params.senha_cripto, 8)
    params.senha_cripto = senha_cripto; // substitui a senha normie pela criptografada
    return cadastro_biblio.create(params);
}

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
    const bibliotecario = await cadastro_biblio.findOne({ //faltava um await, dai tava retornando uma promise
        where: {username: params.username},
    });
    return bibliotecario;
}

const validacao = (senha, senha_cripto) => cripto.compare(senha, senha_cripto)

module.exports = {Todos, add, delet, buscar_id, atualizar, login, validacao, cadastro_biblio};