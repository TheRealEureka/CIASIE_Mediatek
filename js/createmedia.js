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


document.getElementById("create").addEventListener("click", function () {
    type = document.getElementById("med").value;
    title = prompt("Enter the title");
    cover = prompt("Enter the location of the img of the cover");

    switch (type) {
        case "Boo":
            let author = prompt("Enter the author of the book");
            year = prompt("Enter the release year of the book");
            createdMedia = new Book(title, author, year, cover);
            document.getElementById("medias").innerHTML += '<div class="media"><p>Book :' + createdMedia.title + createdMedia.author + createdMedia.releaseYear + '</p><img src="' + cover + '"></div>';
            break;

        case "Mov":
            year = prompt("Enter the release year of the movie");
            let realisator = prompt("Enter the director of the movie");
            createdMedia = new Movie(title, realisator, year, cover);
            document.getElementById("medias").innerHTML += '<div class="media"><p>Movie : ' + createdMedia.title + createdMedia.director + createdMedia.releaseYear + '</p><img src="' + cover + '"></div>';
            break;

        case "Albm":
            year = prompt("Enter the release year of the album");
            let artist = prompt("Enter the artist of the album");
            createdMedia = new Album(title, artist, year, cover);
            document.getElementById("medias").innerHTML += '<div class="media"><p>Album : ' + createdMedia.title + createdMedia.artist + createdMedia.releaseYear + '</p><img src="' + cover + '"></div>';
            break;

        case "Gam":
            year = prompt("Enter the release year of the game");
            let studio = prompt("Enter the studio of the game");
            createdMedia = new Game(title, studio, year, cover);
            document.getElementById("medias").innerHTML += '<div class="media"><p>Game ! ' + createdMedia.title + createdMedia._editor + createdMedia.releaseYear + '</p><img src="' + cover + '"></div>';
            break;
    }


});




