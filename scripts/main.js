(function() {
  "use strict";

  // Initialize AOS on page load
  window.addEventListener('load', () => {
    on_page_load();
    callbackFunc(); // Ensure items are checked on initial load
  });

  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }

  // Hide the loader after the page is fully loaded
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';  // Fade out the loader
      loader.style.transition = 'opacity 0.5s ease';  // Smooth fade-out transition
      setTimeout(() => {
        loader.style.display = 'none';  // Fully remove the loader after fading out
      }, 500);  // 500ms matches the fade-out duration
    }
  });

  const navbar = document.getElementById('header-nav');
  var body = document.getElementsByTagName("body")[0];
  const scrollTop = document.getElementById('scrolltop');

  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm');
      body.style.paddingTop = navbar.offsetHeight + "px";
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm');
      body.style.paddingTop = "0px";
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  var elem = document.querySelector('.grid');
  if (elem) {
    imagesLoaded(elem, function() {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    });
  }

  document.querySelectorAll("[data-bigpicture]").forEach((e) => {
    e.addEventListener("click", (t) => {
      t.preventDefault();
      const data = JSON.parse(e.dataset.bigpicture);
      BigPicture({
        el: t.target,
        ...data
      });
    });
  });

  document.querySelectorAll(".bp-gallery a").forEach((e) => {
    var caption = e.querySelector('figcaption');
    var img = e.querySelector('img');
    img.dataset.caption = '<a class="link-light" target="_blank" href="' + e.href + '">' + caption.innerHTML + '</a>';
    e.addEventListener("click", (t) => {
      t.preventDefault();
      BigPicture({
        el: t.target,
        gallery: '.bp-gallery',
      });
    });
  });

  var items = document.querySelectorAll(".timeline .experience");

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    const threshold = 150; // Adjust this value to control how early the animation triggers

    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.bottom >= 0 - threshold
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        if (!items[i].classList.contains("in-view")) {
          items[i].classList.add("in-view");
        }
      } else if (items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
      }
    }
  }

  window.addEventListener("scroll", callbackFunc);

  // Skills Section Functionality
  document.addEventListener('DOMContentLoaded', function() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategories = document.querySelectorAll('.skills-category');
    const skillItems = document.querySelectorAll('.skill-item');

    // Tab switching functionality
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        skillTabs.forEach(t => t.classList.remove('active'));
        skillCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding category
        tab.classList.add('active');
        const categoryId = tab.getAttribute('data-category');
        document.getElementById(categoryId).classList.add('active');
      });
    });

    // Intersection Observer for skill items animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    skillItems.forEach(item => {
      observer.observe(item);
    });
  });

})();
