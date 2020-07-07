const backdrop = document.querySelector('.backdrop');
const popup = document.querySelector('.popup');

document.querySelector('.primary-btn').addEventListener(
  'click',
  () => {
    backdrop.classList.add('show');
    popup.classList.add('show');
  },
  false,
);

popup.addEventListener(
  'click',
  (e) => {
    const t = e.target;
    if (t.dataset.tag) {
      backdrop.classList.remove('show');
      popup.classList.remove('show');
    }
  },
  false,
);

backdrop.addEventListener(
  'click',
  (e) => {
    backdrop.classList.remove('show');
    if (popup.classList.contains('show')) {
      popup.classList.remove('show');
    }
  },
  false,
);

const lis = Array.from(document.querySelectorAll('.pay-list li'));
lis.forEach((li) => {
  li.addEventListener(
    'click',
    function (e) {
      lis.forEach((l) => {
        if (l == this) this.classList.toggle('active');
        else l.className = '';
      });
    },
    false,
  );
});
