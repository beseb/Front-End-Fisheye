export function handleModalAndForm() {
    const modal = document.getElementById('contact_modal')
    const closeButton = document.querySelector('.modal__close-button')
    const contactButton = document.querySelector('.contact_button')

    const openModal = () => {
        modal.classList.remove('hidden')
        modal.setAttribute('aria-hidden', 'false')
        form.focus()
    }

    const closeModal = () => {
        modal.classList.add('hidden')
        modal.setAttribute('aria-hidden', 'true')
    }

    contactButton.addEventListener('click', openModal)
    closeButton.addEventListener('click', closeModal)

    // Handle click outside the modal
    window.addEventListener('click', (e) => {
        e.target === modal ? closeModal() : false
    })

    // Handle keydown event on escape key
    window.addEventListener('keydown', (e) => {
        e.key === 'Escape' ? closeModal() : false
    })

    // Get the form and its inputs
    const form = document.querySelector('form')
    const firstName = document.querySelector('#first_name')
    const lastName = document.querySelector('#last_name')
    const email = document.querySelector('#email')
    const message = document.querySelector('#message')

    // Handle form submission, no validate for now
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        alert(
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
                message.value
        )
        closeModal()
    })
}
