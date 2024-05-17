import Api from '../api/Api.js'
import Photographer from '../models/Photographer.js'
import PhotographerHero from '../templates/PhotographerHero.js'
import PhotographerMedias from '../templates/PhotographerMedias.js'
import MediasFactory from '../factories/MediasFactory.js'
import { handleModalAndForm } from '../utils/form.js'
// TODO : Ajouter les imports pour les likes, lightbox, form et filtres

// Create an instance of the Api class
const photographersApi = new Api('/data/photographers.json')
// Get the ID of the photographer from the URL
const photographerId = new URLSearchParams(window.location.search).get('id')

// Find the photographer by ID
export const getPhotographerById = async () => {
    // Get the photographers and their medias
    const { photographers, media } = await photographersApi.get()
    // Find the photographer by ID
    const photographer = photographers
        .map((photographer) => new Photographer(photographer))
        .find((photographer) => photographer.id == photographerId)
    // Find the medias by photographer ID
    const photographerMedias = media
        .filter((medias) => medias.photographerId == photographerId)
        .map((media) => new MediasFactory(media).createMedia(media))

    // Return the photographer and his medias
    return { photographer, photographerMedias }
}

// Display the photographer
const displayPhotographerPage = async () => {
    // Get the photographer and his medias
    const { photographer, photographerMedias } = await getPhotographerById()
    const photographerModel = new Photographer(photographer)
    // Create the photographer hero
    const photographerHero = new PhotographerHero(photographerModel)
    photographerHero.createPhotographerHero()
    // Create the photographer medias
    const photographerContent = new PhotographerMedias(
        photographerModel,
        photographerMedias
    )
    photographerContent.createPhotographerMedias()

    // TODO : Ajouter les fonctions pour les likes, lightbox, form et filtres
    // Modal & Form handling
    handleModalAndForm()
    // Add photographer's name to the modal title & aria-label
    document.querySelector('.modal__header-title').textContent =
        `Contactez-moi ${photographer.name}`
    document
        .querySelector('.modal__header-title')
        .setAttribute('aria-label', `Contact me ${photographer.name}`)
}
// Call the displayPhotographerPage function
displayPhotographerPage()
