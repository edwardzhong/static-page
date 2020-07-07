const shop = document.querySelector('.shopping');
const ot = shop.offsetTop;
Scroll.on('scroll', (pos) => {
  const t = shop.offsetTop;
  const y = pos.y;
  if (ot + y < 0 && t == 1) return;
  if (ot + y > 0) {
    shop.style.top = ot + y + 'px';
  } else {
    shop.style.top = '1px';
  }
});
