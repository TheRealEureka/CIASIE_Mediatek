let tab = [];

export function addMedia(media) {
    tab.push(media);
    display();
}

function display(){
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

function edit(media){

}
function del(media){
    let index = tab.indexOf(media);
    if (index >= 0) {
        tab.splice(index, 1);
        display();
    }
}

