import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";
import {edit} from "./main.js";

let tab = [];

get();
display()

export function addMedia(media) {
    tab.push(media);
    display();
    save();
}

function display(type ="all", sort = "title") {

    switch (sort){
        case "date":
             tab.sort(function (a, b) {
                return new Date(b.release) - new Date(a.release);
            });
            break;
        case "title":
            tab.sort(function (a, b) {
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
            tab.sort(function (a, b) {
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
    tab.forEach(function (media) {
        if(media.type === type || type === "all") {
            let med = media.html();
            med.children[2].children[0].addEventListener("click", function () {
                edit(media)
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

function del(media) {
    let index = tab.indexOf(media);
    if (index >= 0) {
        tab.splice(index, 1);
        display();
        save();
    }
}


//Save the list into local storage
   export function save() {
        localStorage.setItem("media", JSON.stringify(tab));
    }

//Get the list from local storage
    function get() {
        let data = localStorage.getItem("media");

        if (data !== null) {
            let str = JSON.parse(data);
            str.forEach(function (media) {
                if (media._type === "books") {
                    tab.push(new Book(media._title, media._author, media._release, media._cover, media._description, media._note));
                }
                if (media._type === 'movies') {
                    tab.push(new Movie(media._title, media._director, media._release, media._cover, media._description, media._note));
                }
                if (media._type === "albums") {
                    tab.push(new Album(media._title, media._artist, media._release, media._cover, media._description,media._note));
                }
                if (media._type === "games") {
                    tab.push(new Game(media._title, media._editor, media._release, media._cover, media._description,media._note));
                }
            });
        }
    }
