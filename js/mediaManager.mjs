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
    console.log(sort);
    display(type, sort);
}

function edit(media) {
    document.getElementById('popupEdit').classList.toggle('hidden');
    document.getElementById('close_popupEd').addEventListener('click', function () {
        document.getElementById('popupEdit').classList.toggle('hidden');
    });

    document.getElementById("editCover").addEventListener("click", function () {
        let tmpcover = document.getElementById("pochette").value;
        if (tmpcover.substring(tmpcover.length - 4) === ".jpg" || tmpcover.substring(tmpcover.length - 4) === ".png" || tmpcover.substring(tmpcover.length - 4) === ".svg" || tmpcover.substring(tmpcover.length - 4) === ".gif" || tmpcover.substring(tmpcover.length - 4) === ".bmp" || tmpcover.substring(tmpcover.length - 4) === "webp") {
            media._cover = tmpcover;
            console.log("oui");
        } else {
            media._cover = 'style/icon/nopic.svg';
            console.log("non");
        }
        console.log(media._cover);
        display();
        save();
    });

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
