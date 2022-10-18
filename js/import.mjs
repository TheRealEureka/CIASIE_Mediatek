const API_KEY = "c3d5654f";
const API_URL = "https://www.omdbapi.com/?apikey=" + API_KEY;
const POSTER_API_URL = "https://img.omdbapi.com/?apikey=" + API_KEY;


function sendRequest(parameters) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return     fetch(API_URL+parameters, options)
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

