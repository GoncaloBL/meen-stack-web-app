console.log('ok')

const iconBtn = document.getElementById('iconsButton');
const detailsBtn = document.getElementById('detailsButton');
const carrouselBtn = document.getElementById('carouselButton');



iconBtn.addEventListener('click', setDisplaytoIcons);

function setDisplaytoIcons() {
    console.log('changing display to icons')
    let list = document.getElementById('itemsList');
    list.classList.add("hidden");
    list.classList.remove("show");

    let icons = document.getElementById('itemsIcons');
    icons.classList.add("show");
    icons.classList.remove("hidden");
}


detailsBtn.addEventListener('click', setDisplaytoList);

function setDisplaytoList() {
    console.log('changing display to list')
    let list = document.getElementById('itemsList');
    list.classList.add("show");
    list.classList.remove("hidden");

    let icons = document.getElementById('itemsIcons');
    icons.classList.add("hidden");
    icons.classList.remove("show");
}

carrouselBtn.addEventListener('click', function () {
    let icons = document.getElementById('carouselMain');
    let arrowdown = document.getElementById('arrowdown');
    icons.classList.add('hidden');
    arrowdown.classList.add('hidden');

})