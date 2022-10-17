class Media {
    constructor(title, release,  cover) {
        this._title = title;
        if(cover === "") {
        this._cover = 'style/icon/nopic.svg';
        }
        else{

            this._checkIfImageExists(cover, (exists) => {
                if (exists) {
                    this._cover = cover;
                } else {
                    this._cover = 'style/icon/nopic.svg';
                }
            })
        }

        this._release = release;
    }
// CHECK IF IMAGE EXISTS
    _checkIfImageExists(url, callback) {
        const img = new Image();
        img.src = url;

        if (img.complete) {
            callback(true);
        } else {
             img.onload = () => {
                callback(true);
            };

             img.onerror = () => {
                callback(false);
            };
        }
    }




    get title() {
        return this._title;
    }

    get cover() {
        return this._cover;
    }

    get release() {
        return this._release;
    }

}


export {Media};