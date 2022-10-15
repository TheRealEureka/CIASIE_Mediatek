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
    displayStep(1);
});



function togglePopup(){
    document.getElementById('popup').classList.toggle('hidden');
}



//Popup form
let steps = document.getElementsByClassName('step');

document.getElementById('create').addEventListener('click', function() {
    displayStep(2);
});

document.getElementById('popup_continue').addEventListener('click', function() {
    displayStep(3);
});

document.getElementById('popup_back').addEventListener('click', function() {
    displayStep(1);
});

function displayStep(step){
    for(let i = 0; i < steps.length; i++){
        steps[i].classList.add('hidden');
    }
    document.getElementById('popup_step' + step).classList.remove('hidden');
}