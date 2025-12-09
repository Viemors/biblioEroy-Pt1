const sections = document.querySelectorAll("section");

// cria um observador que detecta quando cada section entra no campo de visão da tela

const observer = new IntersectionObserver((entries) => {
  // percorre todas as interseções detectadas pelo observer
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // adiciona a classe "active" para ativar as animações no CSS
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => observer.observe(sec));

window.addEventListener("load", () => {
  // adiciona a classe "mostrar" ao <body> para iniciar animações globais
  document.body.classList.add("mostrar");
});

//comentar
