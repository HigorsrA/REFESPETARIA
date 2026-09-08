/**
 * ESPETINHOS KAÇULA - Script Principal
 * Comportamentos de UI: Menu Mobile, Rolagem Suave, Voltar ao Topo e Animações
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTOS DO DOM ---
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.querySelector('.back-to-top');
  const fadeElements = document.querySelectorAll('.fade-up');

  // --- CONTROLE DO MENU MOBILE ---
  const openMenu = () => {
    mainNav.classList.add('open');
    navBackdrop.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mainNav.classList.remove('open');
    navBackdrop.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
  }

  // Fechar menu mobile ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Fechar menu mobile com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });

  // --- CONTROLE DE SCROLL: HEADER & VOLTAR AO TOPO ---
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header com sombra e fundo mais opaco ao rolar
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Botão Voltar ao Topo
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Checagem inicial

  // Ação de clique do botão Voltar ao Topo
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- INTERSECTION OBSERVER: ANIMAÇÕES FADE-IN ---
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    fadeElements.forEach(element => {
      appearOnScroll.observe(element);
    });
  } else {
    // Fallback caso não suporte IntersectionObserver
    fadeElements.forEach(element => {
      element.classList.add('in-view');
    });
  }

  // --- DESTAQUE DE LINK ATIVO NA NAVEGAÇÃO ---
  const sections = document.querySelectorAll('section[id]');
  const highlightNavLink = () => {
    const scrollPosition = (window.scrollY || window.pageYOffset) + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });
});
