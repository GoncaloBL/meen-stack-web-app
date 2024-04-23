//Change display type
const iconBtn = document.getElementById('iconsButton');
const detailsBtn = document.getElementById('detailsButton');
const carrouselBtn = document.getElementById('check-apple');

iconBtn.addEventListener('click', setDisplaytoIcons);
function setDisplaytoIcons() {
    console.log('changing display to icons')
    let list = document.getElementById('itemsList');
    list.classList.add("hidden");
    list.classList.remove("show");

    let icons = document.getElementById('itemsIcons');
    icons.classList.add("show");
    icons.classList.remove("hidden");

    iconBtn.classList.add('nav-buttons-pressed');
    detailsBtn.classList.remove('nav-buttons-pressed')
}


detailsBtn.addEventListener('click', setDisplaytoList);
function setDisplaytoList() {
    let list = document.getElementById('itemsList');
    list.classList.add("show");
    list.classList.remove("hidden");

    let icons = document.getElementById('itemsIcons');
    icons.classList.add("hidden");
    icons.classList.remove("show");

    iconBtn.classList.remove('nav-buttons-pressed');
    detailsBtn.classList.add('nav-buttons-pressed')
}


//hide carousel
carrouselBtn.addEventListener('change', function () {
console.log('chanafgg')

    let carousel = document.getElementById('carouselMain');
    let arrowdown = document.getElementById('arrowdown');

    arrowdown.style.visibility = "hidden";

    if(carousel.classList.contains('hidden')){
    carousel.classList.remove('hidden')
    carousel.classList.add('show')
    } else {
        carousel.classList.add('hidden')
        carousel.classList.remove('show')
    }
})


//client side search field
const search = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')

const scriptTag = document.querySelector('script[src="./javascripts/index.js"]');
const data = JSON.parse(scriptTag.getAttribute('data-data'));


search.addEventListener('submit', function (e) {
    e.preventDefault();


    //find matches with query
    const searchQuery = searchInput.value
    const matches = []
    data.forEach((item, index) => {
        console.log(index)
        if (item.title.toLowerCase().includes(searchQuery.toLowerCase())  || item.location.toLowerCase().includes(searchQuery.toLowerCase())) {
            matches.push(index)
            
        }
    })
    console.log(matches);

    //show only items that match in LIST
    //make it LIST
    let list = document.getElementById('itemsList');
    list.classList.add("show");
    list.classList.remove("hidden");

    let icons = document.getElementById('itemsIcons');
    icons.classList.add("hidden");
    icons.classList.remove("show");


    //select
    const items = document.querySelectorAll('.item');
    items.forEach((item, i) => {
        if (searchQuery == '') {
            item.classList.add('show')
            item.classList.remove('hidden')
        }
        else if (!matches.includes(i)) {
            item.classList.add('hidden')
            item.classList.remove('show')
        } else {
           item.classList.remove('hidden')
            item.classList.add('show')
        }


    })
})

