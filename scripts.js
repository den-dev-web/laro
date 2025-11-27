// Simple interactive behavior: contact form stub, year set, mobile menu (без анимаций)
document.addEventListener('DOMContentLoaded', function () {
  // set year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // Mobile menu toggle
  const mobileMenuButtons = document.querySelectorAll('.mobile-menu-button');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  const body = document.body;

  if (mobileMenuButtons.length > 0 && mobileMenu && mobileMenuOverlay) {
    function closeMenu() {
      mobileMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      mobileMenu.classList.remove('menu-open');
      mobileMenu.classList.add('menu-closed');
      mobileMenuOverlay.classList.remove('menu-open');
      mobileMenuOverlay.classList.add('menu-closed');
      body.classList.remove('menu-open');
    }

    function openMenu() {
      mobileMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
      mobileMenu.classList.remove('menu-closed');
      mobileMenu.classList.add('menu-open');
      mobileMenuOverlay.classList.remove('menu-closed');
      mobileMenuOverlay.classList.add('menu-open');
      body.classList.add('menu-open');
    }

    function toggleMenu() {
      const isOpen = mobileMenuButtons[0]?.getAttribute('aria-expanded') === 'true';
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Toggle on button click
    mobileMenuButtons.forEach(btn => {
      btn.addEventListener('click', toggleMenu);
    });

    // Close menu when clicking on overlay
    mobileMenuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('menu-open')) {
        closeMenu();
      }
    });
  }

  // contact form submission (stub)
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formStatus.textContent = 'Sending...';

    // extract fields
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // This is a demo stub: replace URL with your backend endpoint.
    // Simulate network delay
    setTimeout(() => {
      formStatus.textContent = 'Message sent. We will contact you shortly.';
      form.reset();
    }, 900);

    // Example of how you'd POST to backend:
    // fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    //   .then(r => r.json())
    //   .then(res => { formStatus.textContent = 'Message sent.'; form.reset(); })
    //   .catch(err => { formStatus.textContent = 'Error sending message.'; });
  });

});

