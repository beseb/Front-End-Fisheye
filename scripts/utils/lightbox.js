/**
 * Handle the lightbox
 * @param {Object} photographerContent - Photographer object
 */
export function handleLightbox(photographerContent) {
  const main = document.querySelector('main');
  const lightbox = document.querySelector('.lightbox');
  const lightboxMediaContainer = document.querySelector(
    '.lightbox__media__container',
  );
  const mediasArray = Array.from(document.querySelectorAll('figure'));
  const closeButton = document.querySelector('.lightbox__close-button');
  const prevButton = document.querySelector('.lightbox__prev-button');
  const nextButton = document.querySelector('.lightbox__next-button');

  const photographer = photographerContent.photographer;
  const mediasList = photographerContent.medias;

  // Get the current index of the media
  let currentIndex = parseInt(
    lightboxMediaContainer.getAttribute('data-index'),
  );

  mediasArray.forEach((media) => {
    media.addEventListener('click', () => {
      const mediaId = media.getAttribute('data-media');
      const currentMediaIndex = mediasList.findIndex(
        (media) => media.id === parseInt(mediaId),
      );
      currentIndex = currentMediaIndex;
      showMedia();
      openLightbox();
    });
  });

  const showMedia = () => {
    const currentMedia = mediasList[parseInt(currentIndex)];
    lightboxMediaContainer.setAttribute('data-index', currentIndex);
    lightboxMediaContainer.innerHTML = `
            ${
              currentMedia.image
                ? `<img src="/assets/images/photographers/Sample Photos/${photographer.name}/${currentMedia.image}" alt="${currentMedia.title}">`
                : `<video controls aria-label="${currentMedia.title}">
                    <source src="/assets/images/photographers/Sample Photos/${photographer.name}/${currentMedia.video}" type="video/mp4">
                </video>`
            }
            <figcaption>${currentMedia.title}</figcaption>
        `;
  };

  const openLightbox = () => {
    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.focus();
    // Trap the focus inside the lightbox
    trapTabKey();
    // Hide the main content from screen readers
    main.setAttribute('aria-hidden', 'true');
  };

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
    // Show the main content to screen readers
    main.setAttribute('aria-hidden', 'false');
  };

  const previousMedia = () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = mediasList.length - 1;
    }
    showMedia();
  };

  const nextMedia = () => {
    currentIndex++;
    if (currentIndex >= mediasList.length) {
      currentIndex = 0;
    }
    showMedia();
  };

  // Handle keydown event on keys
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextMedia();
        break;
      case 'ArrowLeft':
        previousMedia();
        break;
    }
  });

  // Handle click outside the lightbox
  window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Trap the focus inside the lightbox
  const trapTabKey = () => {
    const focusableElements = lightbox.querySelectorAll(
      'button:not([disabled]), input',
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    const handleTabPress = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          /* Shift + Tab */
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          /* Tab */
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    // Add the keydown event listener
    lightbox.addEventListener('keydown', handleTabPress);

    // Remove the keydown event listener when the lightbox is closed
    if (lightbox.getAttribute('aria-hidden') === 'true') {
      lightbox.removeEventListener('keydown', handleTabPress);
    }
  };

  // Events listeners for the buttons
  prevButton.addEventListener('click', previousMedia);
  nextButton.addEventListener('click', nextMedia);
  closeButton.addEventListener('click', closeLightbox);
}
