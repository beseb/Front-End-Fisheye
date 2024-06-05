import Image from '../models/Image.js'
import Video from '../models/Video.js'
export default class MediasFactory {
    constructor(data) {
        this.data = data
    }
    // Create the media depending on the media type (image or video)
    createMedia(data) {
        if (data.image) {
            return new Image(data)
        }
        if (data.video) {
            return new Video(data)
        }
    }
    // Create the media item depending on the media type (image or video) and return it with the photographer name as src attribute to find the media in the right folder
    createMediaItem(data, photographerName) {
        const media = this.createMedia(data)
        if (media instanceof Image) {
            return `<img class="main__content__media__image" src="/assets/images/photographers/Sample Photos/${photographerName}/${media.image}" alt="${media.title}">`
        }
        if (this.createMedia(data) instanceof Video) {
            return `<video class="main__content__media__video" controls>
            <source src="/assets/images/photographers/Sample Photos/${photographerName}/${media.video}" type="video/mp4">
            </video>`
        }
    }
}
