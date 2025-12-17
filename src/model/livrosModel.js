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
        allowNull: false,
        unique: true
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
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'sem_imagem.png'
    }
})

//arranjo de inicio
const livros_iniciais = [
    {titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Romance", descricao: "Em Dom Casmurro, o narrador Bento Santiago retoma a infância que passou na Rua de Matacavalos e conta a história do amor e das desventuras que viveu com Capitu, uma das personagens mais enigmáticas e intrigantes da literatura brasileira. Nas páginas deste romance, encontra-se a versão de um homem perturbado pelo ciúme, que revela aos poucos sua psicologia complexa e enreda o leitor em sua narrativa ambígua acerca do acontecimento ou não do adultério da mulher com olhos de ressaca, uma das maiores polêmicas da literatura brasileira.", imagem: "/img/livros/machado/dom casmurro.webp"},
    {titulo: "Otelo", autor: "William Shakespeare", categoria: "Drama", descricao: "Em Veneza, Otelo, um general mouro a serviço do Estado, conquista Desdêmona, uma jovem, filha de um nobre local. Após enfrentar a ira do pai e defender-se com sucesso contra a acusação de tê-la `enfeitiçado`, ele parte a Chipre em companhia da esposa para combater o inimigo turco?otomano. Lá, seu alferes, o manipulador Iago, consegue paulatinamente instilar na mente do mouro a suspeita de que Desdêmona o traiu. Otelo é a tragédia em que Shakespeare estudou os mecanismos da imaginação, da paixão e do ciúme. Em nova tradução de Lawrence Flores Pereira, que recria a linguagem grandiosa de Otelo e a prosa nefasta de Iago, esta nova edição é acompanhada de uma longa introdução e notas contextuais do tradutor, bem como de um ensaio de W. H. Auden", imagem: "/img/livros/shakespeare/otelo.webp"}, 
    {titulo: "Hamlet", autor: "William Shakespeare", categoria: "Drama", descricao: "Neste clássico da literatura mundial, um jovem príncipe se reúne com o fantasma de seu pai, que alega que seu próprio irmão, agora casado com sua viúva, o assassinou. O príncipe cria um plano para testar a veracidade de tal acusação, forjando uma brutal loucura para traçar sua vingança. Mas sua aparente insanidade logo começa a causar estragos - para culpados e inocentes. Esta é a sinopse da tragédia de Shakespeare, agora em nova e fluente tradução de Lawrence Flores Pereira, que também oferece uma alentada introdução à obra. A edição traz ainda um clássico ensaio do poeta T.S. Eliot sobre o texto shakespeariano. Hamlet é um dos momentos mais altos da criação artística, um retrato - eletrizante e sempre contemporâneo - da complexa vida emocional de um ser humano.", imagem: "/img/livros/shakespeare/hamlet.webp"}, 
    {titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", categoria: "Realismo", descricao: "Memórias Póstumas de Brás Cubas (1881), um dos principais romances da literatura brasileira, inaugura a fase madura de Machado de Assis e concretiza o ideal estético que consagrou o autor e marca sua obra. Revolucionário e provocativo, o romance rompe com tradições literárias e sintetiza a crítica machadiana à elite brasileira da época. Um dos personagens mais populares da nossa literatura, Brás Cubas é um defunto-autor que dedica sua obra ao verme que primeiro roeu as frias carnes de seu cadáver. O protagonista narra suas memórias, intercalando episódios, delírios, reflexões e teorias, não poupando ninguém do seu olhar crítico e expondo as atitudes mesquinhas que teve em vida. É definitivamente uma obra imperdível que, com linguagem fluente e coesa, conduz sedutoramente o leitor por uma narrativa que deixa nas entrelinhas muito material para reflexões mais profundas.", imagem: "/img/livros/machado/memorias post.webp"}, 
    {titulo: "A Hora da Estrela", autor: "Clarice Lispector", categoria: "Romantismo", descricao: "Pouco antes de morrer, em 1977, Clarice Lispector decide se afastar da inflexão intimista que caracteriza sua escrita para desafiar a realidade. O resultado desse salto na extroversão é A hora da estrela, o livro mais surpreendente que escreveu. Se desde Perto do coração selvagem, seu romance de estreia, Clarice estava de corpo inteiro, todo o tempo, no centro de seus relatos, agora a cena é ocupada por personagens que em nada se parecem com ela.A nordestina Macabéa, a protagonista de A hora da estrela, é uma mulher miserável, que mal tem consciência de existir. Depois de perder seu único elo com o mundo, uma velha tia, ela viaja para o Rio, onde aluga um quarto, se emprega como datilógrafa e gasta suas horas ouvindo a Rádio Relógio. Apaixona-se, então, por Olímpico de Jesus, um metalúrgico nordestino, que logo a trai com uma colega de trabalho. Desesperada, Macabéa consulta uma cartomante, que lhe prevê um futuro luminoso, bem diferente do que a espera. Clarice cria até um falso autor para seu livro, o narrador Rodrigo S.M., mas nem assim consegue se esconder. O desejo de desaparecimento, que a morte real logo depois consolidaria, se frustra. Entre a realidade e o delírio, buscando social enquanto sua alma a engolfava, Clarice escreveu um livro singular. A hora da estrela é um romance sobre o desamparo a que, apesar do consolo da linguagem, todos estamos entregues.", imagem: "/img/livros/clarice/hora da estrela.webp"}, 
    {titulo: "Água Viva", autor: "Clarice Lispector", categoria: "Romance", descricao: "'Eu escrevo como se fosse para salvar a vida de alguém. Provavelmente a minha própria vida.' Com essas palavras, Clarice Lispector convida o leitor para uma viagem única. Um sopro de vida e A hora da estrela foram escritos simultaneamente, movidos pela mesma pergunta. 'Estou com a impressão de que ando me imitando um pouco. O pior plágio é o que se faz de si mesmo.' Questionamento agravado pela constatação: 'E há também os meus imitadores (…) algumas pessoas que tiveram o mau gosto de serem eu.' Entre elas, os críticos são os que com maior impertinência e constância tentam imitá-la, reduplicando, em suas análises, a ambiguidade radical atribuída à pessoa Clarice Lispector. Com isso, seus livros se transformam sempre num mergulho no infinito de uma identidade à deriva. Um sopro de vida (e A hora da estrela ) deveria(m) ter encerrado essa monótona romaria. Por que não imaginar que a pessoa Clarice foi pretexto para que a persona da escritora, em sua pluralidade, pudesse triunfar?Hipótese que responde à convocação: 'Se alguém me ler será por conta própria e autorrisco.' E, correndo riscos, Um sopro de vida sugere instigante paralelo. Em 1914, Miguel de Unamuno publicou Niebla, desconcertante romance no qual o protagonista, Augusto Pérez, resolve virar autor de seu destino. Em Um sopro de vida, Clarice imagina uma personagem, Ângela Pralini, através da qual dialoga consigo mesma e, sobretudo, ensaia afastar-se de seu estilo. Isto é, afastar-se de si mesma para evitar o 'pior plágio'. E, bem ao contrário de Unamuno – que mantém Augusto Pérez em rédeas curtas –, Clarice é transformada pelo contato com Ângela Pralini. Claro que, em A hora da estrela, a personagem Macabéa levará esse gesto ao extremo. 'Estamos à beira de uma eclosão. À beira de conhecer a nós mesmos. À beira do ano 2000.' Palavras escritas, não esqueçamos, em 1977. Para reconhecer sua rara força e atualidade, precisamos inventar novas leituras dos textos de Clarice Lispector. Atitude que provavelmente agradaria a quem propôs: 'Escrever é uma indagação. É assim:?'", imagem: "/img/livros/clarice/agua viva.webp"}]

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