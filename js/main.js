//Menu tabs
import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";
import {addMedia, displayByType, save} from "./mediaManager.mjs";
import {getAlbumByTitle, getByID, getByTitle} from "./import.mjs";


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
export function select(tab) {
    current_tab = tab;
    document.getElementById("sort").value = "title";
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
let film = true;

document.getElementById('popup_import').addEventListener('click', async function () {
    let radio = [document.getElementById("input_radio_id"), document.getElementById("input_radio_title"), document.getElementById("input_radio_album")];
    let search = document.getElementById("search");
    let regex = new RegExp('^\s*$');
    if (!regex.test(search.value)) {
        if (radio[0].checked) {
            result_query = await getByID(search.value);
        } else if (radio[1].checked) {
            result_query = await getByTitle(search.value);
        } else {
            result_query = await getAlbumByTitle(search.value);
            film = false;
        }
        if (film) {

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


                document.getElementById('messerror').innerText = '';


                displayStep(5);
            }
        }
        else{
            if(result_query.results !== undefined )
            {
                if(result_query.results.albummatches.album.length > 0)
                {
                    let res = result_query.results.albummatches.album[0];
                    document.getElementById('result_title').innerText = 'Title : ' + res.name;
                    document.getElementById('result_release').innerText = 'Release Date : N/A';
                    document.getElementById('result_director').innerText = 'Artist : ' + res.artist;
                    document.getElementById('result_image').src = res.image[3]["#text"];
                    document.getElementById('result_plot').innerText = ''

                    document.getElementById('messerror').innerText = '';


                    displayStep(5);
                }
                else
                {
                    document.getElementById('messerror').innerText = 'No album found';

                }
            }
            else{
                document.getElementById('messerror').innerText = 'An error occured';

            }
        }

        } else {
            document.getElementById('messerror').innerText = 'Please enter a title';
        }


});

document.getElementById('popup_import_final_back').addEventListener('click', function () {
    displayStep(4);
});
document.getElementById('popup_import_final').addEventListener('click', function () {
    if(film) {
        addMedia(new Movie(result_query.Title + ' - IMDB', result_query.Director, result_query.Released, result_query.Poster, result_query.Plot, note));
    }
    else
    {
        addMedia(new Album(result_query.results.albummatches.album[0].name + " - LastFM", result_query.results.albummatches.album[0].artist, 'N/A', result_query.results.albummatches.album[0].image[3]["#text"], ''));
    }
    togglePopup();


});

let current_editing = null;

export function edit(media) {
    current_editing = media;

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
    if(new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$\n').test(media.release))
    {
        release.value = new Date(media.release).toISOString().substr(0, 10);

    }

    cover.value = media.cover;
    desc.value = media.description;
    spec.value = spec_atr;
}

document.getElementById("popup_edit_final").addEventListener("click", function () {
    let title = document.getElementById("edit_title");

    let regex = new RegExp('^\s*$');
    if (!regex.test(title.value))
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
        displayByType(current_tab);
        save();
        document.getElementById("messerror_edit").innerText = "";
        togglePopup();
    }
    else{
        document.getElementById("messerror_edit").innerText = "Title is required";
    }

});
document.getElementById("popup_edit_back").addEventListener("click", function () {
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