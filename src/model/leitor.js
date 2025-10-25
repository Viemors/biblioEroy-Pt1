const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

//definindo a Tabela leitor
// com sequelize
const leitor = db.define("leitor",{
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
    }
})

leitor.sync() // Criar a tabela se não existir

//Funções do sequelize
const Todos = () => leitor.findAll()

const add = (params) => leitor.create(params)

const buscar_id = (id) => leitor.findByPk(id)

const delet = async(id) => {
    await leitor
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
            nome: params.nome,
            email: params.email
        },
        {
            where: {
                id: params.id
            }
        }
    )
}

module.exports = {leitor, Todos, add, delet, buscar_id, atualizar};