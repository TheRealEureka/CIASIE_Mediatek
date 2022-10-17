//Menu tabs
import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";


let menu_item = document.getElementById('nav_items');


for (let child of menu_item.children) {
    child.addEventListener('click', function (e) {
        let active = document.getElementsByClassName('selected');
        for (let act of active) {
            act.classList.remove('selected');
        }
        select(e.target.dataset.tab);
        child.classList.add('selected');
    });
}

//Select tab
function select(tab) {

    console.log(tab);
}

//Popup

document.getElementById('open_popup').addEventListener('click', function () {
    togglePopup()
});

document.getElementById('close_popup').addEventListener('click', function () {
    togglePopup()
    displayStep(1);
});


function togglePopup() {
    document.getElementById('popup').classList.toggle('hidden');
}


//Popup form
let steps = document.getElementsByClassName('step');


//Navigate through steps
document.getElementById('create').addEventListener('click', function () {
    displayStep(2);
});

document.getElementById('popup_continue').addEventListener('click', function () {
    let regex = new RegExp('^\s*$');
    if (regex.test(document.getElementById('title').value)) {
        document.getElementById('title').style.border = "red 2px solid";
        document.getElementById('title').addEventListener('click', function () {
            document.getElementById('title').style.border = "#c2c2c2 1px solid";
        });
    } else {
        displayStep(3);
        document.getElementById('title').style.border = "";
    }

});

document.getElementById('popup_back').addEventListener('click', function () {
    displayStep(1);
});
document.getElementById('popup_final_back').addEventListener('click', function () {
    displayStep(2);
});

document.getElementById('popup_final').addEventListener('click', function () {
    let title = document.getElementById('title').value;
    let year = document.getElementById('release').value;
    let cover = document.getElementById('image').value;
    let artist = document.getElementById('ART').value;

    let type = document.getElementById('med').value;
    let obj;
    switch (type) {
        case "Boo":
            obj = new Book(title, year, cover, artist);
            break;
        case "Mov":
            obj = new Movie(title, year, cover, artist);
            break;
        case "Albm":
            obj = new Album(title, year, cover, artist);
            break;
        case "Gam":
            obj = new Game(title, year, cover, artist);
            break;

    }
});

function displayStep(step) {
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.add('hidden');
    }
    document.getElementById('popup_step' + step).classList.remove('hidden');
}

//Generate specific form for each media type
let type = document.getElementById("med");
type.addEventListener('change', function () {

    let label = "Author :";

    switch (type.value) {
        case "Boo":
            label = "Author :";
            break;

        case "Mov":
            label = "Director :";
            break;

        case "Albm":
            label = "Artist :";
            break;

        case "Gam":
            label = "Studio :";
            break;
    }


    document.getElementById("label_spec").innerText = label;
});