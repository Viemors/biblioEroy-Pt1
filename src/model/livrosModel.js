const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

//definindo a Tabela livros
// com sequelize
const livros = db.define("livros", {
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

livros.sync() // Criar a tabela se não existir

//Funções do sequelize
const Todos = () => livros.findAll()

const add = (params) => livros.create(params)

const buscar_id = (id) => livros.findByPk(id)

const delet = async(id) => {
    await livros
.destroy({
        where: {
            id: id
        }
    });
}


    


module.exports = {livros, Todos, add, delet, buscar_id};