import {Media} from "./media.mjs";

class Movie extends Media {
    constructor(title, director, releaseYear) {
        super(title);
        this._director = director;
        this._releaseYear = releaseYear;
    }

    get director() {
        return this._director;
    }

    get releaseYear() {
        return this._releaseYear;
    }
}

export {Movie};