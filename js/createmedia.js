import {Media} from "./media.mjs";
import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";

let type;
let createdMedia;

let title
let year
let cover
let artist


document.getElementById("create").addEventListener("click", function () {

    type = document.getElementById("med").value;
    document.getElementById("popup").innerHTML = "<label for=\"tit\">Title:</label>\n" +
        "    <input id=\"tit\" type=\"text\"><label for=\"tit\">Cover URL:</label>\n" +
        "    <input id=\"cov\" type=\"text\"><label for=\"RY\">Release year:</label>\n" +
        "    <input id=\"RY\" type=\"text\">";

    switch (type) {
        case "Boo":
            document.getElementById("popup").innerHTML += "<label for=\"ART\">Autheur:</label>\n" +
                "    <input id=\"ART\" type=\"text\">";
            break;

        case "Mov":
            document.getElementById("popup").innerHTML += "<label for=\"ART\">Director:</label>\n" +
                "    <input id=\"ART\" type=\"text\">";
            break;

        case "Albm":
            document.getElementById("popup").innerHTML += "<label for=\"ART\">Artiste:</label>\n" +
                "    <input id=\"ART\" type=\"text\">";
            break;

        case "Gam":
            document.getElementById("popup").innerHTML += "<label for=\"ART\">Studio:</label>\n" +
                "    <input id=\"ART\" type=\"text\">";
            break;
    }

    document.getElementById("popup").innerHTML += "<button id=\"createMedia\">Create</button>";

    document.getElementById("createMedia").addEventListener("click", function () {
        title = document.getElementById("tit").value;
        year = document.getElementById("RY").value;
        cover = document.getElementById("cov").value;
        artist = document.getElementById("ART").value;
        switch (type) {
            case "Boo":
                createdMedia = new Book(title, year, cover, artist);
                break;
            case "Mov":
                createdMedia = new Movie(title, year, cover, artist);
                break;
            case "Albm":
                createdMedia = new Album(title, year, cover, artist);
                break;
            case "Gam":
                createdMedia = new Game(title, year, cover, artist);
                break;
            default:
                createdMedia = new Media(title, year, cover);
        }

        console.log(createdMedia);
    });


});




