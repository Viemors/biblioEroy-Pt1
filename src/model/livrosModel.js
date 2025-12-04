const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const modelLeitor = require("../model/cadastroUserModel")

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

//arranjo de inicio
const livros_iniciais = [{titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Romance"}, {titulo: "O Cortiço", autor: "Aluísio Azevedo", categoria: "Naturalismo"}, {titulo: "Iracema", autor: "José de Alencar", categoria: "Romantismo" }, {titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", categoria: "Realismo"}, {titulo: "A Moreninha", autor: "Joaquim Manuel Macedo", categoria: "Romantismo"}, {titulo: "Vidas Secas", autor: "Graciliano Ramos", categoria: "Romance"}]

livros.sync().then(async ()=>{ // Criar a tabela se não existir
    if(await livros.count() == 0) { //Se a tabela estiver vazia ele atribui os dados iniciais
        livros.bulkCreate(livros_iniciais) //bulkCreate -> Criar com arranjos
    }
});  

//Funções do sequelize
const Todos = () => livros.findAll()

//Função pra encontrar o id de acordo com os outros valores
const buscar = async (params) => await livros.findOne({
    where: {titulo: params.titulo, autor: params.autor, categoria: params.categoria}
})

const add = async (params) => await livros.create(params)

const buscar_id = (id) => livros.findByPk(id)

const buscar_titulo = async (titulo) => await livros.findOne({
    where: {titulo: titulo}
})

const buscar_autor = async (autor) => await livros.findAll({
    where: {autor: autor}
})

const buscar_categoria = async (categoria) => await livros.findAll({
    where: {categoria: categoria}
})

const delet = async(id) => {
    await livros
.destroy({
        where: {
            id: id
        }
    });
}

const mostrarDados = async () => {
    const tabelas = await db.query("show tables")
    .then(([rows, fields]) => {console.log(fields);return rows }
    )
    .catch (err => {return err}
    )
    const result = [];
    if (tabelas) {    
        for(let i = 0; i<tabelas.length; i++) {
            const n1 = await db.query(`select * from ${tabelas[i].Tables_in_bioeroy}`)
            .then(([rows, fields]) => {return {resultados: rows, colunas: fields} }
            )
            .catch(([erro]) => {return erro}
            )

            result.push(n1)  
        };
    }
    console.log(result[0].colunas[0])
    return result
}

    


module.exports = {livros, Todos, add, delet, buscar_id, buscar, buscar_titulo, buscar_autor, buscar_categoria, mostrarDados};