//Menu tabs

let menu_item =document.getElementById('nav_items');

for(let child of menu_item.children){
    child.addEventListener('click', function(e){
        let active = document.getElementsByClassName('selected');
        for(let act of active){
        act.classList.remove('selected');
        }
        select(e.target.dataset.tab);
        child.classList.add('selected');
    });
}
//Select tab
function select (tab){
console.log(tab);
}

//Popup

document.getElementById('open_popup').addEventListener('click', function(){
    togglePopup()
});

document.getElementById('close_popup').addEventListener('click', function(){
    togglePopup()
});

function togglePopup(){
    document.getElementById('popup').classList.toggle('hidden');
}