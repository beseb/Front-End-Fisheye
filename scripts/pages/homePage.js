import Api from '../api/Api.js'
import Photographer from '../models/Photographer.js'
import PhotographerCard from '../templates/HomePage.js'

// Create an instance of the Api class
const photographersApi = new Api('/data/photographers.json')
// Get the photographers section
const photographersSection = document.querySelector('.photographer_section')

// Display the photographers
const displayPhotographers = async () => {
    const data = await photographersApi.get()
    const photographers = data.photographers

    // Create an instance of the Photographer class for each photographer
    photographers.forEach((element) => {
        // Create an instance of each photographer
        const photographer = new Photographer(element)
        // Create an instance of the PhotographerCard class for each photographer
        const photographerCard = new PhotographerCard(photographer)
        // Create the photographer card
        const card = photographerCard.createPhotographerCard()
        // Add the photographer card to the photographers section
        photographersSection.appendChild(card)
    })
}

// Call the displayPhotographers function
displayPhotographers()
