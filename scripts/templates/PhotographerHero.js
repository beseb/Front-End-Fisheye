export default class PhotographerHeader{
    constructor(photographer){
        this.photographer = photographer;
    }
    createPhotographerHero(){
        const hero = document.querySelector('.main__hero');
        hero.innerHTML = `
            <div class="main__hero__info">
            <h1 class="main__hero__info__name">${this.photographer.name}</h1>
            <p class="main__hero__info__location">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="main__hero__info__tagline">${this.photographer.tagline}</p>
            </div>
            <button class="contact_button" onClick=showModal()>Contactez-moi</button>
            <img class="main__hero__image" src="/assets/images/photographers/Sample Photos/Photographers ID Photos/${this.photographer.portrait}" alt="${this.photographer.name}">
        `;
    }
}