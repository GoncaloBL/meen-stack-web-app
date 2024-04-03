
document.getElementById('displayReview');


addEventListener('click', displayElement);

function displayElement() {
    let element = document.getElementById('reviewForm');
    if (element) {
      element.style.display = 'block';
    }
  }