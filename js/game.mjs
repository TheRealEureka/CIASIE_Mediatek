import {Media} from "./media.mjs";

class Game extends Media {
    constructor(title, editor, releaseYear, cover) {
        super(title);
        this._editor = editor;
        this._releaseYear = releaseYear;
        this._cover = cover;
    }

    get creator() {
        return this._editor;
    }

    get releaseYear() {
        return this._releaseYear;
    }
}


export {Game};