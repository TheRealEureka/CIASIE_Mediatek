import {Media} from './media.mjs';

class Album extends Media {
    constructor(title, artist, releaseYear) {
        super(title);
        this._artist = artist;
        this._releaseYear = releaseYear;

    }

    get artist() {
        return this._artist;
    }

    get releaseYear() {
        return this._releaseYear;
    }

}

export {Album};