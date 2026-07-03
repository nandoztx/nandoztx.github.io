// nandoztx — interacoes minimas, sem dependencias
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // barras de stats: JS habilita a animacao (sem JS elas ja renderizam cheias)
    var cards = document.querySelectorAll('.stat-card');
    if (!reduceMotion && 'IntersectionObserver' in window && cards.length) {
        document.body.classList.add('js-anim');
        var barObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });
        cards.forEach(function (card) { barObserver.observe(card); });
    }

    // destaque do link ativo na nav (substitui o ScrollSpy do Bootstrap)
    var navLinks = document.querySelectorAll('.topbar nav a');
    var sections = [];
    navLinks.forEach(function (link) {
        var target = document.querySelector(link.getAttribute('href'));
        if (target) sections.push({ el: target, link: link });
    });
    if ('IntersectionObserver' in window && sections.length) {
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                sections.forEach(function (s) {
                    s.link.classList.toggle('active', s.el === entry.target);
                });
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(function (s) { navObserver.observe(s.el); });
    }
}());
