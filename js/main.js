//Menu tabs
import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";
import {addMedia, displayByType} from "./mediaManager.mjs";
import {getByID, getByTitle} from "./import.mjs";


let menu_item = document.getElementById('nav_items');

let current_tab = "all";

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
    current_tab = tab;
    displayByType(tab);
}

document.getElementById("sort").addEventListener('change', function () {
    displayByType(current_tab, this.value);
});


//Popup

document.getElementById('open_popup').addEventListener('click', function () {
    togglePopup()
});

document.getElementById('close_popup').addEventListener('click', function () {
    togglePopup()
    displayStep(1);
});


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
        document.getElementById('messerror_create').innerText = "Please enter a title";
    } else {
        document.getElementById('messerror_create').innerText = "";

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
    let desc = document.getElementById('description').value;

    let type = document.getElementById('med').value;
    let obj;
    switch (type) {
        case "Boo":
            obj = new Book(title, artist, year, cover, desc);
            break;
        case "Mov":
            obj = new Movie(title, artist, year, cover, desc);
            break;
        case "Albm":
            obj = new Album(title, artist, year, cover, desc);
            break;
        case "Gam":
            obj = new Game(title, artist, year, cover, desc);
            break;
    }
    //reset fields
    togglePopup();
    addMedia(obj);
});


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

document.getElementById('go_to_import').addEventListener('click', function () {
    displayStep(4)
});
document.getElementById('go_to_create').addEventListener('click', function () {
    displayStep(1);

});

document.getElementById('popup_back').addEventListener('click', function () {
    displayStep(1);
});
let note;
let result_query = {};
document.getElementById('popup_import').addEventListener('click', async function () {
    let radio = [document.getElementById("input_radio_id")];
    let search = document.getElementById("search");
    let regex = new RegExp('^\s*$');
    if (!regex.test(search.value)) {
        if (radio[0].checked) {
            result_query = await getByID(search.value);
        } else {
            result_query = await getByTitle(search.value);
        }
        if (result_query.Response === "False") {
            document.getElementById('search').style.border = "red 2px solid";
            document.getElementById('messerror').innerText = 'No movie found';
        } else {
            document.getElementById('search').style.border = "black 2px solid";


            if (result_query.Ratings[0] !== undefined) {
                note = result_query.Ratings[0].Value;
                note = note.split("/")[0]
                console.log(note);
                if (note === "N/A") {
                    note = 'N/A';
                } else {
                    if (note > 9) {
                        note = "⭐⭐⭐⭐⭐";
                    } else if (note > 7) {
                        note = "⭐⭐⭐⭐★";
                    } else if (note > 5) {
                        note = "⭐⭐⭐★★";
                    } else if (note > 3) {
                        note = "⭐⭐★★★";
                    } else if (note > 1) {
                        note = "⭐★★★★";
                    } else {
                        note = "★★★★★";
                    }
                }
            }
            document.getElementById('result_title').innerText = 'Title : ' + result_query.Title;
            document.getElementById('result_release').innerText = 'Release Date : ' + result_query.Released;
            document.getElementById('result_director').innerText = 'Director : ' + result_query.Director;
            document.getElementById('result_image').src = result_query.Poster;

            document.getElementById('result_plot').innerText = 'Plot : ' + result_query.Plot;


            document.getElementById('result_plot').innerText ='Plot : '+ result_query.Plot;
            document.getElementById('messerror').innerText = '';


            displayStep(5);
        }

    }
    else
    {
        document.getElementById('messerror').innerText = 'Please enter a title';

    }
});

document.getElementById('popup_import_final_back').addEventListener('click', function () {
    displayStep(4);
});
document.getElementById('popup_import_final').addEventListener('click', function () {
    addMedia(new Movie(result_query.Title + ' - IMDB', result_query.Director, result_query.Released, result_query.Poster, result_query.Plot, note));
    togglePopup();


});


export function togglePopup() {
    document.getElementById('title').value = "";
    document.getElementById('release').value = "";
    document.getElementById('image').value = "";
    document.getElementById('ART').value = "";
    document.getElementById('med').value = "Mov";
    document.getElementById('search').value = "";
    document.getElementById('description').value = "";
    document.getElementById('description').value ="";
    document.getElementById('messerror').innerText = '';
    document.getElementById('messerror_create').innerText = '';
    document.getElementById("messerror_edit").innerText = "";

    displayStep(1);
    document.getElementById('popup').classList.toggle('hidden');
}

export function displayStep(step) {
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.add('hidden');
    }
    document.getElementById('popup_step' + step).classList.remove('hidden');
}