import { handleLightbox } from '../utils/lightbox.js'

/*
 * handle filter to filter the medias by category
 * @param {Array} data
 */
export function handleFilter(data) {
    const photographer = data.photographer
    // Add Listeners to the filter buttons
    const filterSection = document.querySelector('.filter_section')
    const filter = Array.from(filterSection.querySelectorAll('button'))
    filter.forEach((button) => {
        button.addEventListener('click', (e) => {
            // Change the aria-selected attribute to true or false
            filter.forEach((btn) => btn.setAttribute('aria-selected', 'false'))
            button.setAttribute('aria-selected', 'true')

            // Sort the medias by title, likes or date
            const selectedOption = e.target.value
            const sortedMedias = sortMedias(data, selectedOption)

            // Reorder all the medias from the DOM
            const mediasItems = document.querySelectorAll(
                '.main__content__media__item'
            )
            sortedMedias.forEach((sortedMedia, index) => {
                const mediaElement = Array.from(mediasItems).find(
                    (media) => parseInt(media.dataset.id) === sortedMedia.id
                )
                if (mediaElement) {
                    mediaElement.style.order = index
                    mediaElement.setAttribute('data-order', index)
                }
            })

            // Call handleLightbox to update the medias order in the lightbox
            handleLightbox({ photographer, medias: sortedMedias })
        })
    })
}
// Sort the medias by title, likes or date
function sortMedias(data, selectedOption) {
    return Array.from(data.medias).sort((a, b) => {
        switch (selectedOption) {
            case 'title':
                return a.title.localeCompare(b.title)
            case 'likes':
                return b.likes - a.likes
            case 'date':
                return new Date(b.date) - new Date(a.date)
            default:
                return 0
        }
    })
}
// Handle the filter menu
export const openCloseFilterMenu = () => {
    const filterMenu = document.querySelector('.dropdown_content')
    const filterMenuButton = document.querySelector('.btn_drop')
    const filterButtons = document.querySelectorAll('.dropdown_content button')

    filterMenuButton.addEventListener('click', () => {
        const isExpanded =
            filterMenuButton.getAttribute('aria-expanded') === 'true' || false
        filterMenuButton.setAttribute('aria-expanded', !isExpanded)
        filterMenu.classList.toggle('curtain_effect')
        document.querySelector('.fa-chevron-up').classList.toggle('rotate')

        const newAriaHiddenValue = filterMenu.classList.contains(
            'curtain_effect'
        )
            ? 'false'
            : 'true'
        filterMenu.setAttribute('aria-hidden', newAriaHiddenValue)

        const newTabIndexValue = filterMenu.classList.contains('curtain_effect')
            ? '0'
            : '-1'
        filterButtons.forEach((button) =>
            button.setAttribute('tabindex', newTabIndexValue)
        )
    })
}
