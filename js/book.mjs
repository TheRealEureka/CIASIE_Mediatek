import {Media} from "./media.mjs";

class Book extends Media {
    constructor(title, author, releaseYear) {
        super(title);
        this._author = author;
        this._releaseYear = releaseYear;
    }

    get author() {
        return this._author;
    }

    get releaseYear() {
        return this._releaseYear;
    }
}

export {Book};