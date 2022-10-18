import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";
import {togglePopup, displayStep} from "./main.js";

let tab = [];

get();
display()

export function addMedia(media) {
    tab.push(media);
    display();
    save();
}

function display(type ="all", sort = "title") {
        //sort array by release date
    let sorted = tab;
    switch (sort){
        case "date":
             sorted.sort(function (a, b) {
                return new Date(b.release) - new Date(a.release);
            });
            break;
        case "title":
            sorted.sort(function (a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            break;
        case "type" :
            sorted.sort(function (a, b) {
                if (a.type < b.type) {
                    return -1;
                }
                if (a.type > b.type) {
                    return 1;
                }
                return 0;
            });
            break;
    }

    document.getElementById("cards").innerHTML = "";
    sorted.forEach(function (media) {
        if(media.type === type || type === "all") {
            let med = media.html();
            med.children[2].children[0].addEventListener("click", function () {
                edit(media)
                display();
            });
            med.children[2].children[1].addEventListener("click", function () {
                del(media);
                display();
            });
            document.getElementById("cards").appendChild(med);
        }
    })
}

export function displayByType(type, sort="title") {
    display(type, sort);
}
let current_editing = null;

function edit(media) {
    togglePopup();
    displayStep(6);
    let label = "Studio :";
    let spec_atr = "";
    switch (media.type) {
        case "books":
            label = "Author :";
            spec_atr = media.author;
            break;

        case "movies":
            label = "Director :";
            spec_atr = media.director;
            break;

        case "albums":
            label = "Artist :";
            spec_atr = media.artist;
            break;

        case "games":
            label = "Studio :";
            spec_atr = media.creator;
            break;
    }
    document.getElementById("edit_label_spec").innerText = label;
    let title = document.getElementById("edit_title");
    let release = document.getElementById("edit_release");
    let cover = document.getElementById("edit_image");
    let desc = document.getElementById("edit_description");
    let spec = document.getElementById("edit_ART");
    title.value = media.title;
    release.value = new Date(media.release).toISOString().substr(0, 10);
    cover.value = media.cover;
    desc.value = media.description;
    spec.value = spec_atr;
     current_editing = media;
}

document.getElementById("popup_edit_final").addEventListener("click", function () {
    let title = document.getElementById("edit_title");

    let regex = new RegExp('^\s*$');
    if (regex.test(title.value))
    {
        let release = document.getElementById("edit_release");
    let cover = document.getElementById("edit_image");
    let desc = document.getElementById("edit_description");
    let spec = document.getElementById("edit_ART");
    current_editing._title = title.value;
    current_editing._release = release.value;
    current_editing._cover = cover.value;
    current_editing._description = desc.value;
    switch (current_editing.type) {
        case "books":
            current_editing._author = spec.value;
            break;
        case "movies":
            current_editing._director = spec.value;
            break;
        case "albums":
            current_editing._artist = spec.value;
            break;
        case "games":
            current_editing._creator = spec.value;
            break;
    }
    display();
    save();
        document.getElementById("messerror_edit").innerText = "";
    togglePopup();
    }
    else{
        document.getElementById("messerror_edit").innerText = "Title is required";
    }

});
function del(media) {
    let index = tab.indexOf(media);
    if (index >= 0) {
        tab.splice(index, 1);
        display();
        save();
    }
}


//Save the list into local storage
    function save() {
        localStorage.setItem("media", JSON.stringify(tab));
    }

//Get the list from local storage
    function get() {
        let data = localStorage.getItem("media");
        if (data !== null) {
            let str = JSON.parse(data);
            str.forEach(function (media) {
                if (media._author !== undefined) {
                    tab.push(new Book(media._title, media._author, media._release, media._cover, media._description));
                }
                if (media._director !== undefined) {
                    tab.push(new Movie(media._title, media._director, media._release, media._cover, media._description));
                }
                if (media._artist !== undefined) {
                    tab.push(new Album(media._title, media._artist, media._release, media._cover, media._description));
                }
                if (media._editor !== undefined) {
                    tab.push(new Game(media._title, media._editor, media._release, media._cover, media._description));
                }
            });
        }
    }
