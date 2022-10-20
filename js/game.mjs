import {Media} from "./media.mjs";

class Game extends Media {
    constructor(title, editor, releaseYear, cover, desc="", notes="") {
        super(title, releaseYear, cover, desc, notes);
        this._editor = editor;
        this._type = "games";
    }

    get creator() {
        return this._editor;
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
                        <h4><span class="icon icon-game"></span> ${this.title}</h4>
                        <small>Released ${this.release}</small>
                        <small>${this._editor}</small>
                        <p>${this.description}</p>

                    </div>
                    <div class="actions">
                        <button class="action-edit"><span class="icon icon-pencil"></span> Edit</button>
                        <button class="action-remove"><span class="icon icon-trash"></span> Remove</button>
                    </div>`;
        return obj;
    }
}


export {Game};