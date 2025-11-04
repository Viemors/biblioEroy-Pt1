//GET /
const paginaInicial = (req, res) => {
    res.render("home", { nome: "Eroy" });
};

const cadastro = (req, res) => {
    res.render("cadastro/cadastro")
}

const login = (req, res) => {
    res.render("login/login")
}

const perfil_biblio = (req, res) => {
    res.render("perfis/perfilBiblio")
}

const perfil_leitor = (req, res) => {
    res.render("perfis/perfilLeitor")
}

const perfil_livro = (req, res) => {
    res.render("perfis/perfilLivro")
}

const emprestimo = (req, res) => {
    res.render("emprestimo/emprestimo")
}
  
module.exports = {
   paginaInicial, perfil_leitor, perfil_livro, perfil_biblio, cadastro, login, emprestimo
};
