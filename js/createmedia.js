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

document.getElementById("create").addEventListener("click", function() {
type = document.getElementById("med").value;
switch (type) {
case "Boo":
    title = prompt("Enter the title of the book");
    let author = prompt("Enter the author of the book");
    year = prompt("Enter the release year of the book");
    cover = prompt("Enter the cover of the book");
    createdMedia = new Book(title, author, year, cover);
    document.getElementById("medias").innerHTML += '<div class="media"><p>Book :'+createdMedia.title+createdMedia.author+createdMedia.releaseYear+'</p></div>';
    break;

case "Mov":
    title = prompt("Enter the title of the movie");
    year = prompt("Enter the release year of the movie");
    cover = prompt("Enter the cover of the movie");
    let realisator = prompt("Enter the director of the movie");
    createdMedia = new Movie(title, realisator, year, cover);
    document.getElementById("medias").innerHTML += '<div class="media"><p>Movie : '+createdMedia.title+createdMedia.director+createdMedia.releaseYear+'</p></div>';
    break;

case "Albm":
    title = prompt("Enter the title of the album");
    year = prompt("Enter the release year of the album");
    cover = prompt("Enter the cover of the album");
    let artist = prompt("Enter the artist of the album");
    createdMedia = new Album(title, artist, year, cover);
    document.getElementById("medias").innerHTML += '<div class="media"><p>Album : '+createdMedia.title+createdMedia.artist+createdMedia.releaseYear+'</p></div>';
    break;

case "Gam":
    title = prompt("Enter the title of the game");
    year = prompt("Enter the release year of the game");
    cover = prompt("Enter the cover of the game");
    let studio = prompt("Enter the studio of the game");
    createdMedia = new Game(title, studio, year, cover);
    document.getElementById("medias").innerHTML += '<div class="media"><p>Game ! '+createdMedia.title+createdMedia._editor+createdMedia.releaseYear+'</p></div>';
    break;
}




});