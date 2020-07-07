const backdrop = document.getElementsByClassName('backdrop')[0];
const popup = document.getElementsByClassName('popup')[0];

function showPopup() {
  backdrop.classList.add('show');
  popup.classList.add('show');
}

function hidePopup() {
  backdrop.classList.remove('show');
  popup.classList.remove('show');
}

Array.from(document.querySelectorAll('.btn')).forEach((i) => {
  i.addEventListener('click', showPopup, false);
});
document.querySelector('.close').addEventListener('click', hidePopup, false);
document.querySelector('.yes').addEventListener('click', hidePopup, false);
