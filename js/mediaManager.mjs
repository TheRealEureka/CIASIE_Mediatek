import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";

let tab = [];
get();
display()

export function addMedia(media) {
    tab.push(media);
    display();
    save();
}

function display() {
    document.getElementById("cards").innerHTML = "";
    tab.forEach(function (media) {
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
    })
}

export function displayByType(type) {
    document.getElementById("cards").innerHTML = "";
    if (type === "all") {
        display();
    } else {
        tab.forEach(function (media) {
            console.log(media.type);
            if (media.type === type) {
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
}

    function edit(media) {

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
                    tab.push(new Book(media._title, media._author, media._release, media._cover));
                }
                if (media._director !== undefined) {
                    tab.push(new Movie(media._title, media._director, media._release, media._cover));
                }
                if (media._artist !== undefined) {
                    tab.push(new Album(media._title, media._artist, media._release, media._cover));
                }
                if (media._editor !== undefined) {
                    tab.push(new Game(media._title, media._editor, media._release, media._cover));
                }
            });
        }
    }
