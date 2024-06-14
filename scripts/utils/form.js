/*
 * Handle the form and the modal
 */
export function handleModalAndForm() {
  // Get the main content and the modal
  const main = document.querySelector('main');
  const modal = document.getElementById('contact_modal');
  const closeButton = document.querySelector('.modal__close-button');
  const contactButton = document.querySelector('.contact_button');

  // Get the form and its inputs
  const form = document.querySelector('form');
  const firstName = document.querySelector('#first_name');
  const lastName = document.querySelector('#last_name');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  const openModal = () => {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.tabIndex = 0;
    // Trap the focus inside the modal
    trapTabKey(modal);

    // Hide the main content from screen readers
    main.setAttribute('aria-hidden', 'true');
    main.tabIndex = -1;
    // Focus the first input
    document.getElementById('first_name').focus();
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modal.tabIndex = -1;
    // Show the main content to screen readers
    main.setAttribute('aria-hidden', 'false');
    main.tabIndex = 0;
    // Focus the contact button
    contactButton.focus();
  };

  contactButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);

  // Handle click outside the modal
  window.addEventListener('click', (e) => {
    e.target === modal ? closeModal() : false;
  });

  // Handle keydown event on escape key
  window.addEventListener('keydown', (e) => {
    e.key === 'Escape' ? closeModal() : false;
  });

  // Trap the focus inside the modal
  const trapTabKey = (modal) => {
    const focusableElements = modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select',
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    const handleTabPress = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          /* Shift + Tab */ if (
            document.activeElement === firstFocusableElement
          ) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } /* Tab */ else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    // Add the keydown event listener
    modal.addEventListener('keydown', handleTabPress);

    // Remove the keydown event listener
    if (modal.getAttribute('aria-hidden') === 'true') {
      modal.removeEventListener('keydown', handleTabPress);
    }
  };

  // Handle form submission, no validate for now
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(
      'Les infos du formulaire de contact ont été envoyées !' +
        '\n' +
        'Prénom : ' +
        firstName.value +
        '\n' +
        'Nom : ' +
        lastName.value +
        '\n' +
        'Email : ' +
        email.value +
        '\n' +
        'Message : ' +
        message.value,
    );
    closeModal();
  });
}
