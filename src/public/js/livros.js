document.addEventListener('DOMContentLoaded', () => {
  // Verifica usuário logado e se é bibliotecário
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.username === usuarioLogado);

  const idsBibliotecarios = ['joao2025', 'maria_prof', 'admin001', 'lucas.aluno', 'prof.roberta'];
  const isBibliotecario = usuario && idsBibliotecarios.includes(usuario.idAcesso);

  const livrosRemovidos = JSON.parse(localStorage.getItem('livrosRemovidos')) || [];

  // 👉 Esconde o botão "Edite sua lista!" se for bibliotecário
  if (isBibliotecario) {
    const botaoEditarListaGeral = document.getElementById('btnEditarListaGeral');
    if (botaoEditarListaGeral) {
      botaoEditarListaGeral.style.display = 'none';
    }
  }

  // Gerencia os cards
  document.querySelectorAll('.btn-curtir').forEach(btn => {
    const titulo = btn.getAttribute('data-titulo');
    const cardCol = btn.closest('.col-md-4');
    const cardBody = btn.closest('.card-body');

    const btnEditarLista = cardBody.querySelector('.btn-editar-lista');

    if (isBibliotecario) {
      if (btn) btn.style.display = 'none';
      if (btnEditarLista) btnEditarLista.style.display = 'none';
    }

    // Livro removido
    if (livrosRemovidos.includes(titulo)) {
      if (isBibliotecario) {
        cardCol.style.opacity = '0.4';
        const btnRemover = cardBody.querySelector('.btn-remover');
        if (btnRemover) btnRemover.style.display = 'none';

        let aviso = cardBody.querySelector('.aviso-removido');
        if (!aviso) {
          aviso = document.createElement('div');
          aviso.className = 'aviso-removido text-danger mt-2';
          aviso.textContent = 'Livro removido permanentemente';

          const btnRestaurar = document.createElement('button');
          btnRestaurar.className = 'btn btn-outline-dark mt-2 btn-restaurar';
          btnRestaurar.textContent = 'Restaurar Livro';
          btnRestaurar.addEventListener('click', () => {
            let removidos = JSON.parse(localStorage.getItem('livrosRemovidos')) || [];
            removidos = removidos.filter(l => l !== titulo);
            localStorage.setItem('livrosRemovidos', JSON.stringify(removidos));
            window.location.reload();
          });

          aviso.appendChild(btnRestaurar);
          cardBody.appendChild(aviso);
        }
      } else {
        if (cardCol) cardCol.remove();
      }
      return;
    }

    // CURTIR para usuários normais
    if (!isBibliotecario && btn) {
      const curtidos = JSON.parse(localStorage.getItem('livrosCurtidos')) || [];
      if (curtidos.includes(titulo)) {
        btn.classList.add('curtido');
        btn.textContent = 'Curtido ❤️';
      }

      btn.addEventListener('click', () => {
        let curtidos = JSON.parse(localStorage.getItem('livrosCurtidos')) || [];
        if (btn.classList.contains('curtido')) {
          curtidos = curtidos.filter(l => l !== titulo);
          btn.classList.remove('curtido');
          btn.textContent = 'Curtir';
        } else {
          curtidos.push(titulo);
          btn.classList.add('curtido');
          btn.textContent = 'Curtido ❤️';
        }
        localStorage.setItem('livrosCurtidos', JSON.stringify(curtidos));
      });
    }

    // Botão remover para bibliotecário
    if (isBibliotecario && !livrosRemovidos.includes(titulo)) {
      if (!cardBody.querySelector('.btn-remover')) {
        const btnRemover = document.createElement('button');
        btnRemover.className = 'btn btn-outline-dark mt-2 btn-remover';
        btnRemover.textContent = 'Remover Permanentemente';
        btnRemover.addEventListener('click', () => {
          cardCol.style.opacity = '0.4';
          btnRemover.style.display = 'none';
          if (btn) btn.style.display = 'none';
          if (btnEditarLista) btnEditarLista.style.display = 'none';

          let aviso = cardBody.querySelector('.aviso-removido');
          if (!aviso) {
            aviso = document.createElement('div');
            aviso.className = 'aviso-removido text-danger mt-2';
            aviso.textContent = 'Livro removido permanentemente';

            const btnRestaurar = document.createElement('button');
            btnRestaurar.className = 'btn btn-outline-dark mt-2 btn-restaurar';
            btnRestaurar.textContent = 'Restaurar Livro';
            btnRestaurar.addEventListener('click', () => {
              let removidos = JSON.parse(localStorage.getItem('livrosRemovidos')) || [];
              removidos = removidos.filter(l => l !== titulo);
              localStorage.setItem('livrosRemovidos', JSON.stringify(removidos));
              window.location.reload();
            });

            aviso.appendChild(btnRestaurar);
            cardBody.appendChild(aviso);
          }

          let removidos = JSON.parse(localStorage.getItem('livrosRemovidos')) || [];
          if (!removidos.includes(titulo)) {
            removidos.push(titulo);
            localStorage.setItem('livrosRemovidos', JSON.stringify(removidos));
          }
        });

        cardBody.appendChild(btnRemover);
      }
    }
  });

});


document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('div, h1, p, form');

  elementos.forEach(el => {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elementos.forEach(el => {
    observer.observe(el);
  });
});
