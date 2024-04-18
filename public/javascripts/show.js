
const btn = document.getElementById('displayReview');


btn.addEventListener('click', displayElement);

function displayElement() {

    let form = document.getElementById('reviewForm');
    if(form.classList.contains('hidden')){
    form.classList.remove('hidden')
    form.classList.add('show')
    } else {
      form.classList.add('hidden')
    form.classList.remove('show')
    }
  }