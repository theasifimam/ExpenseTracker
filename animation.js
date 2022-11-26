var dvd = document.querySelector(".dvd");
var wrap = document.querySelector(".dvd-wrap");
var boxWrap = wrap.getBoundingClientRect();
var boxDvd = dvd.getBoundingClientRect();
/*
    Movement coordonates
    left   ↖ ↗ top
    bottom ↙ ↘ right
*/
var dirs = ["top", "right", "bottom", "left"];
var direction = dirs[1];
var bounceInterval = 0;
var x = 0;
var y = 0;
function bounce() {
  var updateCoord = function (i) {
    var sign = [
      [1, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
    ];
    x += sign[i][0];
    y += sign[i][1];
    dvd.setAttribute(
      "style",
      "transform: translate(".concat(x, "px, ").concat(y, "px)")
    );
  };
  var getBorders = function () {
    return [
      y < 0,
      x + boxDvd.width > boxWrap.width,
      y + boxDvd.height > boxWrap.height,
      x < 0,
    ];
  };
  var catchOverflow = function (i) {
    return i >= 4 ? i - 4 : i < 0 ? 4 + i : i;
  }; //ok
  var getIndex = function (offset) {
    return catchOverflow(dirs.indexOf(direction) + offset);
  };
  var border = getBorders();
  var Sens = {
    curr: getIndex(+0),
    next: getIndex(+1),
    prev: getIndex(-1),
  };
  if (!border[Sens.curr] && !border[Sens.next]) {
    updateCoord(Sens.curr);
  } else {
    direction = border[Sens.next] ? dirs[Sens.prev] : dirs[Sens.next];
  }
  bounceInterval = requestAnimationFrame(bounce);
}
window.onload = bounce;
window.onresize = function () {
  dvd = document.querySelector(".dvd");
  wrap = document.querySelector(".dvd-wrap");
  boxWrap = wrap.getBoundingClientRect();
  boxDvd = dvd.getBoundingClientRect();
};
