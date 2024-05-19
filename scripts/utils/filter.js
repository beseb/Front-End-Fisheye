/*
 * handle filter to filter the medias by category
 * @param {Array} data
 */
export function handleFilter(data) {
    const filter = document.querySelector('select')
    // Add an event listener to the filter to filter the medias by title, likes or date
    filter.addEventListener('change', (e) => {
        const selectedOption = e.target.value
        // Sort the medias by title, likes or date
        const sortedMedias = sortMedias(data, selectedOption)
        // Reorder all the medias from the DOM
        const medias_items = document.querySelectorAll(
            '.main__content__media__item'
        )
        sortedMedias.forEach((sortedMedia, index) => {
            const mediaElement = Array.from(medias_items).find(
                (media) => parseInt(media.dataset.id) === sortedMedia.id
            )
            if (mediaElement) {
                mediaElement.style.order = index
            
            }
        })
    })
}
function sortMedias(data, selectedOption) {
    return Array.from(data.medias).sort((a, b) => {
        switch (selectedOption) {
            case 'title':
                return a.title.localeCompare(b.title)
            case 'likes':
                return b.likes - a.likes
            case 'date':
                return new Date(b.date) - new Date(a.date)
        }
    })
}
