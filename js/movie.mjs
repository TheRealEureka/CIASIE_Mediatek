import {Media} from "./media.mjs";

class Movie extends Media {
    constructor(title, director, releaseYear, cover) {
        super(title);
        this._director = director;
        this._releaseYear = releaseYear;
        this._cover = cover;
    }

    get director() {
        return this._director;
    }

    get releaseYear() {
        return this._releaseYear;
    }
}

export {Movie};