const API_KEY = "c3d5654f";
const API_URL = "https://www.omdbapi.com/?apikey=" + API_KEY;

const API_ALBUM_KEY = "8387fc6e24b7efac64fdff9a67fa82e8";
const API_ALBUM_URL = "https://ws.audioscrobbler.com/2.0/?method=album.search";

const API_GAME_KEY = "5ab65f9574d9432999e006da7461936e";
const API_GAME_URL = "https://api.rawg.io/api/games/";


async function sendRequest(parameters) {
    let options = {
        method: "GET"
    }
    return await fetch(API_URL+parameters, options)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data;
        });
}
async function sendRequestAlbum(parameters) {
    let options = {
        method: "GET"
    }
    return await  fetch(API_ALBUM_URL+parameters, options)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data;
        });
}

async function sendRequestGame(parameters) {
    let options = {
        method: "GET"
    }
    return  await   fetch(API_GAME_URL+parameters, options)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data;
        });
}

export async function  getByID(id) {
    return await sendRequest("&i="+id);
}

export async function  getByTitle(name) {
    return await sendRequest("&t="+name);
}

export async function  getAlbumByTitle(name) {
    return await sendRequestAlbum("&album="+name+"&limit=1"+ "&api_key="+API_ALBUM_KEY+"&format=json");
}

export async function  getGameByTitle(name) {
    return await sendRequestGame("?search="+name+"&key="+API_GAME_KEY);
}

