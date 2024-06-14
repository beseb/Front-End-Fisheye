export default class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
  }
  createPhotographerCard() {
    const article = document.createElement('article');
    article.classList.add('photographer-card');
    article.innerHTML = `
            <a href="photographer.html?id=${this.photographer.id}" class="photographer-card__link" role="link" aria-label="Voir le profil de ${this.photographer.name}">
                <img class="photographer-card__img" src="/assets/images/photographers/Sample Photos/Photographers ID Photos/${this.photographer.portrait}" alt="portrait de ${this.photographer.name}" >
                <h2 class="photographer-card__name">${this.photographer.name}</h2>
            </a>
            <p class="photographer-card__location">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="photographer-card__tagline">${this.photographer.tagline}</p>
            <span class="photographer-card__price">${this.photographer.price}€/jour</span>
        `;
    return article;
  }
}
