export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer
        this.medias = medias
    }
    createPhotographerMedias() {
        const content_section = document.querySelector('.main__content')
        // Create the header of the content section
        content_section.innerHTML += `
           
        <div class="main__content__media">
        ${this.medias.map((media) => {
            const mediaContent = media.image
                ? `<img class="main__content__media__image" src="/assets/images/photographers/Sample Photos/${this.photographer.name}/${media.image}" alt="${media.title}">`
                : `<video class="main__content__media__video" controls>
            <source src="/assets/images/photographers/Sample Photos/${this.photographer.name}/${media.video}" type="video/mp4">
            </video>`
            return `
                <article class="main__content__media__item">
                <figure data-media="${media.id}" aria-label="voir en grand" alt="${media.title}">${mediaContent}</figure>  
                <figcaption class="main__content__media__item__caption">
                <h2 class="main__content__media__item__caption__title">${media.title}</h2>
                <div class="main__content__media__item__caption__likes">
                <button class="main__content__media__item__caption__likes-btn" aria-label="likes" data-likes="${media.likes}">${media.likes}</button>
                <i class="fas fa-heart"></i>
                </div>
               </figcaption>
                </article>
            `
        })}
        <aside>
        <p class="photographer_Likes">
            <span class="photographer_likes_count"></span>
            <span class="fas fa-heart" aria-hidden="true"></span>
        </p>
        <span>${this.photographer.price}€ / jour</span>
    </aside>
        </div>`
    }
}
