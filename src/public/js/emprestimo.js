document.addEventListener('DOMContentLoaded', () => {
    const elementos = document.querySelectorAll('div, details, h2, p, form, input, ul li');

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
