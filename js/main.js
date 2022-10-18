//Menu tabs
import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";
import {addMedia, displayByType} from "./mediaManager.mjs";
import {getByID,getByTitle} from "./import.mjs";


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
            obj = new Book(title, artist, year, cover);
            break;
        case "Mov":
            obj = new Movie(title, artist, year, cover);
            break;
        case "Albm":
            obj = new Album(title,artist, year, cover);
            break;
        case "Gam":
            obj = new Game(title, artist, year, cover);
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
    displayStep(4);
});
let result_query = {};
document.getElementById('popup_import').addEventListener('click', async function () {
    let radio = [document.getElementById("input_radio_id")];
    let search = document.getElementById("search");
    if(search.value !== "")
    {
        if (radio[0].checked) {
            result_query = await getByID(search.value);
        } else {
            result_query = await getByTitle(search.value);
        }
        if(result_query.Response === "False")
        {
            alert("No result found");
        }
        else
        {
            document.getElementById('result_title').innerText = 'Title : '+result_query.Title;
            document.getElementById('result_release').innerText = 'Release Date : '+result_query.Released;
            document.getElementById('result_director').innerText = 'Director : '+result_query.Director;
            document.getElementById('result_image').src = result_query.Poster;

            console.log(result_query);
            displayStep(5);
        }
    }
});

document.getElementById('popup_import_final_back').addEventListener('click', function () {
    displayStep(4);
});
document.getElementById('popup_import_final').addEventListener('click',  function () {
    addMedia( new Movie(result_query.Title,result_query.Director,result_query.Released,result_query.Poster, result_query.Plot));
    togglePopup();


});


function togglePopup() {
    document.getElementById('title').value = "";
    document.getElementById('release').value = "";
    document.getElementById('image').value = "";
    document.getElementById('ART').value = "";
    document.getElementById('med').value = "Mov";
    document.getElementById('search').value = "";
    displayStep(1);
    document.getElementById('popup').classList.toggle('hidden');
}

function displayStep(step) {
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.add('hidden');
    }
    document.getElementById('popup_step' + step).classList.remove('hidden');
}