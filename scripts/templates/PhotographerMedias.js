import MediasFactory from '../factories/MediasFactory.js';

export default class PhotographerMedias {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;
  }

  createPhotographerMedias() {
    const content_section = document.querySelector('.main__content');
    const mediaItems = this.medias
      .map((media, index) => {
        const mediaContent = new MediasFactory(media).createMediaItem(
          media,
          this.photographer.name,
        );
        return `
                <article class="main__content__media__item" data-id="${media.id}" data-order="${index}" style="order:${index}">
                    <figure data-media="${media.id}" aria-label="${media.title} closeup view">
                        ${mediaContent}
                    </figure>
                    <figcaption class="main__content__media__item__caption">
                        <h2 class="main__content__media__item__caption__title">${media.title}</h2>
                        <div class="main__content__media__item__caption__likes">
                            <button class="main__content__media__item__caption__likes-btn" aria-label="likes" data-likes="${media.likes}">${media.likes}</button>
                            <i class="fas fa-heart"></i>
                        </div>
                    </figcaption>
                </article>
            `;
      })
      .join('');

    content_section.innerHTML += `
            <div class="main__content__media">
                ${mediaItems}
                <aside>
                    <p class="photographer_Likes">
                        <span class="photographer_likes_count"></span>
                        <span class="fas fa-heart" aria-hidden="true"></span>
                    </p>
                    <span>${this.photographer.price}€ / jour</span>
                </aside>
            </div>
        `;
  }
}
