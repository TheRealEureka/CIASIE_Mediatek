let tab = [];

export function addMedia(media) {
    tab.push(media);
}

export function display(){
    let html = "";
    tab.forEach(function (media) {
        html += media.display();
    })
}