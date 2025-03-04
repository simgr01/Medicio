(function() {
    "use strict";
    
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const preloader = document.querySelector('#preloader');
    let scrollTop = document.querySelector('.scroll-top');
    let navmenulinks = document.querySelectorAll('.navmenu a');
  
    function toggleScrolled() {
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  
    function mobileNavToogle() {
      selectBody.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
  
    function aosInit() {
      AOS.init({duration: 600, easing: 'ease-in-out', once: true, mirror: false});
    }
  
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
        swiperElement.classList.contains("swiper-tab") ? initSwiperWithCustomPagination(swiperElement, config) : new Swiper(swiperElement, config);
      });
    }
  
    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (section && window.scrollY + 200 >= section.offsetTop && window.scrollY + 200 <= section.offsetTop + section.offsetHeight) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      });
    }
  
    if (preloader) window.addEventListener('load', () => preloader.remove());
    window.addEventListener('load', toggleScrollTop);
    window.addEventListener('load', aosInit);
    window.addEventListener('load', initSwiper);
    window.addEventListener('load', navmenuScrollspy);
  
    document.addEventListener('scroll', toggleScrolled);
    document.addEventListener('scroll', toggleScrollTop);
    document.addEventListener('scroll', navmenuScrollspy);
  
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => { if (selectBody.classList.contains('mobile-nav-active')) mobileNavToogle(); });
    });
  
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(faqItem => {
      faqItem.addEventListener('click', () => faqItem.parentNode.classList.toggle('faq-active'));
    });
  
    window.addEventListener('load', function() {
      if (window.location.hash && document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({top: section.offsetTop - parseInt(scrollMarginTop), behavior: 'smooth'});
        }, 100);
      }
    });
  
    document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
      carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>`;
      });
    });
  
    GLightbox({selector: '.glightbox'});
    new PureCounter();
  
  })();
  