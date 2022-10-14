class Media {
    constructor(title, cover) {
        this._title = title;
        this._cover = cover;


    }

    get title() {
        return this._title;
    }

    get cover() {
        return this._cover;
    }

}


export {Media};