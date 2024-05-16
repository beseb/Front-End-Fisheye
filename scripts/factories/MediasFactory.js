import Image from '../models/Image.js';
import Video from '../models/Video.js';

export default class MediasFactory {
    constructor(data) {
        this.data = data;
    }
    createMedia(data) {
        if (data.image) {
            return new Image(data);
        } else {
            return new Video(data);
        }
    }
}