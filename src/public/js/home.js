const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => observer.observe(sec));

window.addEventListener("load", () => {
  document.body.classList.add("mostrar");
});

//comentar
