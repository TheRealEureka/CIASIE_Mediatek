import {Media} from "./media.mjs";

class Movie extends Media {
    constructor(title, director, releaseYear, cover, desc = "", notes = "N/A") {
        super(title, releaseYear, cover, desc);
        this._director = director;
        this._type = "movies";
        this._notes = notes;
    }

    get director() {
        return this._director;
    }

    get type(){
        return this._type;
    }
     html(){
        let obj = document.createElement("div");
        obj.classList.add("card");

        obj.innerHTML= `
                <img class="card-image" draggable="false" src="${this.cover}" alt="album">
                    <div class="card-content">
                        <h4><span class="icon icon-movie"></span> ${this.title}</h4>
                        <small>Released ${this.release}</small>
                        <small>${this._director} - ${this._notes}</small>
                        <p>${this.description}</p>
                    </div>
                    <div class="actions">
                        <button class="action-edit"><span class="icon icon-pencil"></span> Edit</button>
                        <button class="action-remove"><span class="icon icon-trash"></span> Remove</button>
                    </div>`;
        return obj;
    }
}

export {Movie};