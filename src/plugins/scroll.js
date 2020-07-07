document.body.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault();
  },
  { passive: false },
);
let contentTop = 0; // 记录要滚动元素的top值，默认情况为0，因为默认显示时，内容的头部时紧挨着容器的
function scrollPage(ele) {
  let startY = 0;
  const getTouchObj = (event) =>
    ((touches) => ('0' in touches ? touches[0] : null))(event.targetTouches || event.originalEvent.targetTouches);
  const windowHeight = () => window.innerHeight || document.documentElement.clientHeight;
  const getPos = (touchObj) => ({ x: touchObj.pageX, y: touchObj.pageY, time: new Date() });
  const getOffsetY = (start, endPos) => endPos.y - start;
  const getContentHeight = () => ele.offsetHeight; // 滚动元素的高度
  if (getContentHeight() <= windowHeight()) return;
  const getRealOffset = (offset, top) => {
    if (offset > 0) {
      // 处理下滑
      if (offset + top <= 0) return offset; // 下滑的距离没有超出顶部
      return -top; // 下滑的距离超出了顶部
    }
    if (offset < 0) {
      // 处理上滑
      if (Math.abs(offset) + Math.abs(top) + windowHeight() <= getContentHeight()) return offset; // 上滑的距离没有超出底部
      return -(getContentHeight() - Math.abs(top) - windowHeight()); // 上滑的距离超出了底部
    }
    return 0;
  };

  ele.addEventListener('touchstart', (e) => {
    startY = getPos(getTouchObj(e)).y; // 监听记录滑动的开始Y坐标
  });

  ele.addEventListener('touchmove', (e) => {
    ((offsetY) => {
      const offset = getRealOffset(offsetY, contentTop);
      if (Math.abs(offset) > 1) {
        contentTop += offset;
        ele.style.transform = `matrix(1, 0, 0, 1, 0, ${contentTop})`;
      }
    })(getOffsetY(startY, getPos(getTouchObj(e))));
    startY = getPos(getTouchObj(e)).y; // 更新当前的滑动Y坐标
  });
}
const ele = document.getElementById('pageContainer');
if (ele) scrollPage(ele);
