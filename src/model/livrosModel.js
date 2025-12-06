const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const modelLeitor = require("../model/cadastroUserModel")
const bd = require("../config/bd")


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
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'SEM DESCRIÇÃO'
    }
})

//arranjo de inicio
const livros_iniciais = [
    {titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Romance", descricao: "Em Dom Casmurro, o narrador Bento Santiago retoma a infância que passou na Rua de Matacavalos e conta a história do amor e das desventuras que viveu com Capitu, uma das personagens mais enigmáticas e intrigantes da literatura brasileira. Nas páginas deste romance, encontra-se a versão de um homem perturbado pelo ciúme, que revela aos poucos sua psicologia complexa e enreda o leitor em sua narrativa ambígua acerca do acontecimento ou não do adultério da mulher com olhos de ressaca, uma das maiores polêmicas da literatura brasileira."},
    {titulo: "O Cortiço", autor: "Aluísio Azevedo", categoria: "Naturalismo", descricao: "Romance de caracteres múltiplos, mas de destino coletivo, esta obra aborda temáticas pouco comuns para sua época – sexualidade, adultério, racismo, prostituição –, para expor os males da promiscuidade da vida de trabalhadores pobres, amontoados em habitações coletivas e submetidos à exploração inescrupulosa. Alegorizando o Brasil do século XIX, Aluísio Azevedo exprime a visão pessimista de sua época, marcada pela concepção determinista do meio físico."}, 
    {titulo: "Iracema", autor: "José de Alencar", categoria: "Romantismo", descricao: "É um romance da literatura romântica brasileira publicado em 1865 e escrito por José de Alencar, fazendo parte da trilogia indianista do autor. O romance conta, de forma quase poética, o amor de um branco, Martim Soares Moreno, pela índia Iracema, a virgem dos lábios de mel e de cabelos mais negros que a asa da graúna e explica poeticamente as origens da terra natal do autor, o Ceará." }, 
    {titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", categoria: "Realismo", descricao: "Memórias Póstumas de Brás Cubas (1881), um dos principais romances da literatura brasileira, inaugura a fase madura de Machado de Assis e concretiza o ideal estético que consagrou o autor e marca sua obra. Revolucionário e provocativo, o romance rompe com tradições literárias e sintetiza a crítica machadiana à elite brasileira da época. Um dos personagens mais populares da nossa literatura, Brás Cubas é um defunto-autor que dedica sua obra ao verme que primeiro roeu as frias carnes de seu cadáver. O protagonista narra suas memórias, intercalando episódios, delírios, reflexões e teorias, não poupando ninguém do seu olhar crítico e expondo as atitudes mesquinhas que teve em vida. É definitivamente uma obra imperdível que, com linguagem fluente e coesa, conduz sedutoramente o leitor por uma narrativa que deixa nas entrelinhas muito material para reflexões mais profundas."}, 
    {titulo: "A Moreninha", autor: "Joaquim Manuel Macedo", categoria: "Romantismo", descricao: null}, 
    {titulo: "Vidas Secas", autor: "Graciliano Ramos", categoria: "Romance", descricao: "Vidas Secas é um romance de Graciliano Ramos, publicado em 1938, que retrata a vida difícil de uma família de retirantes nordestinos durante a seca. A obra é conhecida por sua linguagem simples e direta, e por sua crítica social contundente. A narrativa acompanha Fabiano, sua esposa Sinhá Vitória, seus filhos e a cachorra Baleia enquanto lutam para sobreviver em um ambiente hostil e árido. Vidas Secas é uma obra fundamental da literatura brasileira, que aborda temas como a pobreza, a injustiça social e a luta pela sobrevivência."}]

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

const buscar_titulo = async (titulo) => await bd.promise().query(`SELECT * FROM livros WHERE titulo = '${titulo}' LIMIT 1`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro
})

const buscar_autor = async (autor) => await bd.promise().query(`SELECT * FROM livros WHERE autor = '${autor}'`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro
})

const buscar_categoria = async (categoria) => await bd.promise().query(`SELECT * FROM livros WHERE categoria = '${categoria}'`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})


const delet = async(id) => {
    await livros
.destroy({
        where: {
            id: id
        }
    });
}

const mostrarDados = async () => {
    const tabelas = await bd.promise().query("show tables")
    .then(([rows, fields]) => {console.log(fields);return rows }
    )
    .catch (err => {return err}
    )
    const result = [];
    if (tabelas) {    
        for(let i = 0; i<tabelas.length; i++) {
            const n1 = await bd.promise().query(`select * from ${tabelas[i].Tables_in_bioeroy}`)
            .then(([rows, fields]) => {return {resultados: rows, colunas: fields} }
            )
            .catch(([erro]) => {return erro}
            )

            result.push(n1)  
        };
    }
    console.log(result[0].colunas[0].name)
    return result
}

    


module.exports = {livros, Todos, add, delet, buscar_id, buscar, buscar_titulo, buscar_autor, buscar_categoria, mostrarDados};