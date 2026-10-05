// Page behavior: footer year, mobile menu, contact form validation and submission
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
    // Button that opened the menu: focus returns to it and it closes the Tab loop
    let ActiveMenuButton = null;

    // ShouldRestoreFocus is false for link clicks, so focus follows the anchor target instead
    function closeMenu(ShouldRestoreFocus = true) {
      mobileMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      mobileMenu.classList.remove('menu-open');
      mobileMenu.classList.add('menu-closed');
      mobileMenuOverlay.classList.remove('menu-open');
      mobileMenuOverlay.classList.add('menu-closed');
      body.classList.remove('menu-open');
      mobileMenu.inert = true;
      if (ShouldRestoreFocus && ActiveMenuButton) {
        ActiveMenuButton.focus();
      }
    }

    function openMenu() {
      mobileMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
      mobileMenu.classList.remove('menu-closed');
      mobileMenu.classList.add('menu-open');
      mobileMenuOverlay.classList.remove('menu-closed');
      mobileMenuOverlay.classList.add('menu-open');
      body.classList.add('menu-open');
      mobileMenu.inert = false;
      mobileMenuLinks[0]?.focus({ preventScroll: true });
    }

    function toggleMenu(event) {
      const isOpen = mobileMenuButtons[0]?.getAttribute('aria-expanded') === 'true';
      ActiveMenuButton = event.currentTarget;

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
    mobileMenuOverlay.addEventListener('click', () => closeMenu());

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => closeMenu(false));
    });

    // Keep Tab focus cycling between the toggle button and the menu links while the menu is open
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab' || !mobileMenu.classList.contains('menu-open') || !ActiveMenuButton) {
        return;
      }
      const FocusLoop = [ActiveMenuButton, ...mobileMenuLinks];
      const FirstItem = FocusLoop[0];
      const LastItem = FocusLoop[FocusLoop.length - 1];

      if (!FocusLoop.includes(document.activeElement)) {
        event.preventDefault();
        FirstItem.focus();
      } else if (event.shiftKey && document.activeElement === FirstItem) {
        event.preventDefault();
        LastItem.focus();
      } else if (!event.shiftKey && document.activeElement === LastItem) {
        event.preventDefault();
        FirstItem.focus();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('menu-open')) {
        closeMenu();
      }
    });

    // From this width the burger is hidden (see .menu-desktop-flex in styles.css), so an open
    // menu would keep body scroll locked with no way to close it
    const DesktopNavMinWidth = 926;
    window.matchMedia(`(min-width: ${DesktopNavMinWidth}px)`).addEventListener('change', function (event) {
      if (event.matches && mobileMenu.classList.contains('menu-open')) {
        closeMenu(false);
      }
    });
  }

  // Reveal [data-anim] elements when they scroll into view (styles in styles.css)
  const AnimatedElements = document.querySelectorAll('[data-anim]');
  const PrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (AnimatedElements.length > 0 && 'IntersectionObserver' in window && !PrefersReducedMotion) {
    // Share of the element that must be visible before it animates in
    const RevealThreshold = 0.15;
    const RevealObserver = new IntersectionObserver(function (Entries, Observer) {
      Entries.forEach(Entry => {
        if (!Entry.isIntersecting) {
          return;
        }
        Entry.target.style.animationDelay = `${Number(Entry.target.dataset.delay) || 0}ms`;
        Entry.target.classList.add('is-revealed');
        Observer.unobserve(Entry.target);
      });
    }, { threshold: RevealThreshold });

    document.documentElement.classList.add('reveal-ready');
    AnimatedElements.forEach(AnimatedElement => RevealObserver.observe(AnimatedElement));
  }

  // Contact form: client-side validation + submission to a form service.
  // The endpoint is the form's `action` attribute. While it is "#", no service is connected
  // and the form runs in demo mode: it validates and simulates a successful send.
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (form && formStatus) {
    const FormDemoAction = '#';
    const DemoSendDelayMs = 900;
    const FormMessages = {
      Sending: 'Sending...',
      Success: 'Message sent. We will contact you shortly.',
      Failure: 'Could not send the message. Please try again or email us at info@laro.com.',
      Required: 'This field is required.',
      InvalidEmail: 'Please enter a valid email address.',
      TooShort: (MinLength) => `Please enter at least ${MinLength} characters.`
    };
    const RequiredFields = form.querySelectorAll('[required]');
    const SubmitButton = form.querySelector('button[type="submit"]');
    const HoneypotField = form.querySelector('input[name="website"]');

    function GetFieldError(Field) {
      const Value = Field.value.trim();
      if (Value === '') {
        return FormMessages.Required;
      }
      if (Field.validity.typeMismatch || Field.validity.patternMismatch) {
        return FormMessages.InvalidEmail;
      }
      // Checked manually: native tooShort ignores trimmed whitespace and values set without typing
      if (Field.minLength > 0 && Value.length < Field.minLength) {
        return FormMessages.TooShort(Field.minLength);
      }
      return '';
    }

    // Shows or clears the field's error message; returns true when the field is valid
    function ValidateField(Field) {
      const ErrorText = GetFieldError(Field);
      const ErrorElement = document.getElementById(Field.getAttribute('aria-describedby'));
      Field.setAttribute('aria-invalid', ErrorText ? 'true' : 'false');
      if (ErrorElement) {
        ErrorElement.textContent = ErrorText;
      }
      return ErrorText === '';
    }

    function SetStatus(Text, State) {
      formStatus.textContent = Text;
      formStatus.dataset.state = State;
    }

    async function SendForm() {
      const Action = form.getAttribute('action');
      if (!Action || Action === FormDemoAction) {
        await new Promise(Resolve => setTimeout(Resolve, DemoSendDelayMs));
        return;
      }
      const Response = await fetch(Action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!Response.ok) {
        throw new Error(`Form service responded with status ${Response.status}`);
      }
    }

    // Re-check a field as the user corrects it, so the error disappears once fixed
    RequiredFields.forEach(Field => {
      Field.addEventListener('input', function () {
        if (Field.getAttribute('aria-invalid') === 'true') {
          ValidateField(Field);
        }
      });
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (SubmitButton?.disabled) {
        return;
      }

      const InvalidFields = [...RequiredFields].filter(Field => !ValidateField(Field));
      if (InvalidFields.length > 0) {
        SetStatus('', '');
        InvalidFields[0].focus();
        return;
      }

      // A filled honeypot means a bot: pretend success without sending anything
      if (HoneypotField?.value) {
        form.reset();
        SetStatus(FormMessages.Success, 'success');
        return;
      }

      if (SubmitButton) {
        SubmitButton.disabled = true;
      }
      SetStatus(FormMessages.Sending, 'sending');
      try {
        await SendForm();
        form.reset();
        SetStatus(FormMessages.Success, 'success');
      } catch {
        SetStatus(FormMessages.Failure, 'error');
      } finally {
        if (SubmitButton) {
          SubmitButton.disabled = false;
        }
      }
    });
  }

});

