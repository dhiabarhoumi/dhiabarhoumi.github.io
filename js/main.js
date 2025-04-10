// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Typing effect
  const typingTexts = document.querySelectorAll('.typing-text');
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let deletingDelay = 50;
  let pauseDelay = 2000;

  function type() {
    const currentText = typingTexts[currentTextIndex];
    const text = currentText.getAttribute('data-text') || currentText.textContent;
    
    if (isDeleting) {
      currentText.textContent = text.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingDelay = deletingDelay;
    } else {
      currentText.textContent = text.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && currentCharIndex === text.length) {
      isDeleting = true;
      typingDelay = pauseDelay;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  if (typingTexts.length > 0) {
    setTimeout(type, 1000);
  }

  // AOS initialization
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Certification Navigation
  const container = document.querySelector('.certifications-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cards = document.querySelectorAll('.certification-card');
  
  if (!container || !prevBtn || !nextBtn || !cards.length) {
    console.error('Required elements for certification navigation not found');
    return;
  }

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth;
  const gap = 32; // 2rem gap between cards

  function scrollToCard(index) {
    if (index < 0 || index >= cards.length) return;
    
    currentIndex = index;
    const scrollPosition = index * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    updateButtonStates();
  }

  function updateButtonStates() {
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
    nextBtn.style.opacity = currentIndex === cards.length - 1 ? '0.5' : '1';
    nextBtn.style.cursor = currentIndex === cards.length - 1 ? 'default' : 'pointer';
  }

  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  });

  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentIndex < cards.length - 1) {
      scrollToCard(currentIndex + 1);
    }
  });

  // Touch support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndex < cards.length - 1) {
        // Swipe left
        scrollToCard(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right
        scrollToCard(currentIndex - 1);
      }
    }
  }

  // Initialize button states
  updateButtonStates();
}); 