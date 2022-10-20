//Menu tabs
import {Book} from "./book.mjs";
import {Movie} from "./movie.mjs";
import {Album} from "./album.mjs";
import {Game} from "./game.mjs";
import {addMedia, displayByType, save} from "./mediaManager.mjs";
import {getAlbumByTitle, getBookByTitle, getByID, getByTitle, getGameByTitle} from "./import.mjs";

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
let med = document.getElementById("med");
med.addEventListener('change', function () {

    let label = "Author :";

    switch (med.value) {
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
let type = 'film';
let resultdata = {
    "title": "",
    "release": "",
    "cover": "",
    "plot": "",
    "custom": "",
    "custom_field": ""
}
document.getElementById("apiTypeSelect").addEventListener('change', function () {
    document.getElementById("radioMovie").classList.add("hidden");
    if (this.value === "input_radio_title") {
        document.getElementById("radioMovie").classList.toggle("hidden");
    }

});

document.getElementById('popup_import').addEventListener('click', async function () {
    let radio = [document.getElementById("input_radio_id"), document.getElementById("input_radio_title"), document.getElementById("input_radio_album")];
    let search = document.getElementById("search");
    let succes = false;
    let regex = new RegExp('^\s*$');
    let result_query = {};
    let error =  document.getElementById("messerror");


    if (!regex.test(search.value)) {
        if (radio[0].checked && document.getElementById("apiTypeSelect").value === "input_radio_title") {
            type = 'film';
            result_query = await getByID(search.value);
        } else if (radio[1].checked && document.getElementById("apiTypeSelect").value === "input_radio_title") {
            type = 'film';
            result_query = await getByTitle(search.value);
        } else if (document.getElementById("apiTypeSelect").value === "input_radio_album") {
            type = 'album';
            result_query = await getAlbumByTitle(search.value);
        } else if (document.getElementById("apiTypeSelect").value === "input_radio_game") {
            type = 'game';
            result_query = await getGameByTitle(search.value);
        } else if (document.getElementById("apiTypeSelect").value === "input_radio_book") {
            type = 'book';
            result_query = await getBookByTitle(search.value);
        } else {
            return;
        }


        if (type === "film") {

            if (result_query.Response === "False") {
                document.getElementById('search').style.border = "red 2px solid";
                error.innerText = 'No movie found';
            } else {
                document.getElementById('search').style.border = "black 2px solid";

                resultdata['title'] = result_query.Title;
                resultdata['release'] = result_query.Released;
                resultdata['cover'] = result_query.Poster;
                resultdata['plot'] = result_query.Plot;
                resultdata['custom'] = result_query.Director;
                resultdata['custom_field'] = "Director";

                if (result_query.Ratings[0] !== undefined) {
                    note = result_query.Ratings[0].Value;
                    note = note.split("/")[0]
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


                succes = true;
            }
        } else if (type === 'album') {
            if (result_query.results !== undefined) {
                if (result_query.results.albummatches.album.length > 0) {
                    let res = result_query.results.albummatches.album[0];
                    resultdata['title'] = res.name;
                    resultdata['release'] = 'N/A';
                    resultdata['cover'] = res.image[3]["#text"];
                    resultdata['plot'] = '';
                    resultdata['custom'] = res.artist;
                    resultdata['custom_field'] = "Artist";


                    succes = true;
                } else {
                    error.innerText = 'No album found';

                }
            }

        } else if (type === 'game') {
            if (result_query.detail === undefined) {
                console.log(result_query);
                resultdata['title'] = result_query.name;
                resultdata['release'] = result_query.released;
                resultdata['cover'] = result_query.background_image;
                let desc = result_query.description_raw.split(".");

                if (desc.length > 1) {
                    desc = desc[0] + "." + desc[1] + ".";
                } else if (desc.length > 0) {
                    desc = desc[0] + ".";
                }
                resultdata['plot'] = desc;
                let devs = "";
                let dev = result_query.developers;
                for (let i = 0; i < dev.length; i++) {
                    devs += dev[i].name;
                    if (i !== dev.length - 1) {
                        devs += ", ";
                    }
                }
                resultdata['custom'] = devs;
                resultdata['custom_field'] = "Editor";
                succes = true;
            } else {
                error.innerText = 'No game found';

            }
        } else if (type === 'book') {
            if (result_query.items !== undefined) {
                if (result_query.items.length > 0) {
                    let res = result_query.items[0];
                    resultdata['title'] = res.volumeInfo.title;
                    resultdata['release'] = res.volumeInfo.publishedDate;
                    if (res.volumeInfo.imageLinks !== undefined) {
                    resultdata['cover'] = res.volumeInfo.imageLinks.thumbnail;} else {
                        resultdata['cover'] = 'style/icon/nopic.svg';
                    }
                    resultdata['plot'] = res.volumeInfo.description;
                    let dev = res.volumeInfo.authors;
                    let devs = "";
                    for (let i = 0; i < dev.length; i++) {
                        devs += dev[i].name;
                        if (i !== dev.length - 1) {
                            devs += ", ";
                        }
                    }
                    resultdata['custom'] = devs;
                    resultdata['custom_field'] = "Author";

                    succes = true;

                } else {
                    error.innerText = 'Please enter a title';
                }
            }
        }
    }
        if (succes) {

            document.getElementById('result_title').innerText = 'Title : ' + resultdata.title;
            document.getElementById('result_release').innerText = 'Release Date : ' + resultdata.release;
            document.getElementById('result_director').innerText = resultdata.custom_field + " : " + resultdata.custom;
            document.getElementById('result_image').src = resultdata.cover;
            if (resultdata.plot === undefined || resultdata.plot === "N/A" || resultdata.plot === "") {
                document.getElementById('result_plot').innerText = "";

            } else {
                document.getElementById('result_plot').innerText = "Plot : " + resultdata.plot;

            }
            error.innerText = '';
            displayStep(5);


        } else {
            if(error.innerText === '')
            {
                error.innerText = 'An error occured';

            }
        }


    }
);


    document.getElementById('popup_import_final_back').addEventListener('click', function () {
        displayStep(4);
    });
    document.getElementById('popup_import_final').addEventListener('click', function () {
        if (type === 'film') {
            addMedia(new Movie(resultdata.title + ' - IMDB', resultdata.custom, resultdata.release, resultdata.cover, resultdata.plot, note));
        } else if (type === 'album') {
            addMedia(new Album(resultdata.title + " - LastFM", resultdata.custom, 'N/A', resultdata.cover, ''));
        } else if (type === 'game') {
            addMedia(new Game(resultdata.title + " - IGDB", resultdata.custom, resultdata.release, resultdata.cover, resultdata.plot));
        }else if (type === 'book') {
            addMedia(new Book(resultdata.title + " - GoogleAPI", resultdata.custom, resultdata.release, resultdata.cover, resultdata.plot));
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
        if (new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$\n').test(media.release)) {
            release.value = new Date(media.release).toISOString().substr(0, 10);

        }

        cover.value = media.cover;
        desc.value = media.description;
        spec.value = spec_atr;
    }

    document.getElementById("popup_edit_final").addEventListener("click", function () {
        let title = document.getElementById("edit_title");

        let regex = new RegExp('^\s*$');
        if (!regex.test(title.value)) {
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
        } else {
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
        document.getElementById('description').value = "";
        document.getElementById("messerror").innerText = '';
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