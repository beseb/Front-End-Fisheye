/**
 * Handle the lightbox
 * @param {Object} photographerContent - Photographer object
 */
export function handleLightbox(photographerContent) {
    const main = document.querySelector('main')
    const lightbox = document.querySelector('.lightbox')
    const lightboxMediaContainer = document.querySelector(
        '.lightbox__media__container'
    )
    const mediasArray = Array.from(document.querySelectorAll('figure'))
    const closeButton = document.querySelector('.lightbox__close-button')
    const prevButton = document.querySelector('.lightbox__prev-button')
    const nextButton = document.querySelector('.lightbox__next-button')

    const photographer = photographerContent.photographer
    const mediasList = photographerContent.medias
    let currentIndex = 0

    mediasArray.forEach((media) => {
        media.addEventListener('click', () => {
            const mediaId = media.getAttribute('data-media')
            const currentMedia = mediasList.findIndex(
                (media) => media.id === parseInt(mediaId)
            )
            currentIndex = currentMedia
            showMedia()
            openLightbox()
        })
    })
    const showMedia = () => {
        const currentMedia = mediasList[currentIndex]
        lightboxMediaContainer.innerHTML = `
        ${
            currentMedia.image
                ? `<img src="/assets/images/photographers/Sample Photos/${photographer.name}/${currentMedia.image}" alt="${currentMedia.title}">`
                : `<video controls aria-label="${currentMedia.alt}">
        <source src="/assets/images/photographers/Sample Photos/${photographer.name}/${currentMedia.video}" type="video/mp4">
        </video>`
        }
        <figcaption>${currentMedia.title}</figcaption>
        `
    }
    const openLightbox = () => {
        lightbox.classList.remove('hidden')
        lightbox.setAttribute('aria-hidden', 'false')
        lightbox.focus()
        lightbox.tabIndex = 0
        // Trap the focus inside the lightbox
        trapTabKey(lightbox)
        // Hide the main content from screen readers
        main.setAttribute('aria-hidden', 'true')
        main.tabIndex = -1
    }

    const closeLightbox = () => {
        lightbox.classList.add('hidden')
        lightbox.setAttribute('aria-hidden', 'true')
        lightbox.tabIndex = -1
        // Show the main content to screen readers
        main.setAttribute('aria-hidden', 'false')
        main.tabIndex = 0
    }
    const previousMedia = () => {
        currentIndex--
        if (currentIndex < 0) {
            currentIndex = mediasList.length - 1
        }
        showMedia(currentIndex)
    }
    const nextMedia = () => {
        currentIndex++
        if (currentIndex >= mediasList.length) {
            currentIndex = 0
        }
        showMedia(currentIndex)
    }

    // Handle keydown event on keys
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Escape':
                closeLightbox()
                break
            case 'ArrowRight':
                previousMedia()
                break
            case 'ArrowLeft':
                nextMedia()
                break
        }
    })
    // Handle click outside the lightbox
    window.addEventListener('click', (e) => {
        e.target === lightbox ? closeLightbox() : false
    })
    // Trap the focus inside the lightbox
    const trapTabKey = () => {
        const focusableElements = lightbox.querySelectorAll(
            ' button:not([disabled]),  input'
        )
        const firstFocusableElement = focusableElements[0]
        const lastFocusableElement =
            focusableElements[focusableElements.length - 1]

        const handleTabPress = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    /* Shift + Tab */ if (
                        document.activeElement === firstFocusableElement
                    ) {
                        e.preventDefault()
                        lastFocusableElement.focus()
                    }
                } /* Tab */ else {
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault()
                        firstFocusableElement.focus()
                    }
                }
            }
        }
        // Add the keydown event listener
        lightbox.addEventListener('keydown', handleTabPress)

        // Remove the keydown event listener
        if (lightbox.getAttribute('aria-hidden') === 'true') {
            lightbox.removeEventListener('keydown', handleTabPress)
        }
    }

    // Events listeners for the buttons
    prevButton.addEventListener('click', previousMedia)
    nextButton.addEventListener('click', nextMedia)
    closeButton.addEventListener('click', closeLightbox)
}
