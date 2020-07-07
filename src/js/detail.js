/* 弹窗相关 */
const backdrop = document.querySelector('.backdrop');
const popups = document.querySelectorAll('.popup');
const dias = document.querySelectorAll('.dia a');

Array.from(dias).forEach((ele, i) => {
  ele.addEventListener(
    'click',
    () => {
      backdrop.classList.add('show');
      popups[i].classList.add('show');
    },
    false,
  );
});

Array.from(popups).forEach((ele, i) => {
  ele.addEventListener(
    'click',
    (e) => {
      const t = e.target;
      if (t.dataset.tag) {
        backdrop.classList.remove('show');
        popups[i].classList.remove('show');
      }
    },
    false,
  );
});

backdrop.addEventListener(
  'click',
  (e) => {
    backdrop.classList.remove('show');
    popups.forEach((ele) => {
      if (ele.classList.contains('show')) {
        ele.classList.remove('show');
      }
    });
  },
  false,
);

/* 轮播图 */
function slidePictures() {
  const imgs = document.querySelectorAll('.banner');
  const navs = document.querySelectorAll('.nav-list li');
  const l = imgs.length;
  let timer;
  let curr = 0;
  let next = 0;

  init();

  function init() {
    if (!l) return;
    imgs[0].className = 'banner init';
    navs[0].className = 'active';
    if (l < 2) return;
    timer = setTimeout(autoPlay, 4000);
  }

  function autoPlay() {
    clearTimeout(timer);
    curr = next;
    next = ++next % l;
    animate();
    timer = setTimeout(autoPlay, 4000);
  }

  function animate() {
    for (let i = 0; i < l; i++) {
      imgs[i].className = 'banner';
      navs[i].className = '';
      if (i == curr) {
        imgs[i].className = 'banner active curr';
      }
      if (i == next) {
        imgs[i].className = 'banner active next';
        navs[i].className = 'active';
      }
    }
    setTimeout(() => {
      imgs[curr].className = 'banner';
      imgs[next].className = 'banner init';
    }, 450);
  }
}

slidePictures();
