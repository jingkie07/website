// Slider: arrows, dots, and auto-play
var slides = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dots button');
var current = 0;
var timer;

function show(n) {
  current = (n + slides.length) % slides.length;
  slides.forEach(function (s, i) { s.classList.toggle('on', i === current); });
  dots.forEach(function (d, i) { d.classList.toggle('on', i === current); });
}
function restart() {
  clearInterval(timer);
  timer = setInterval(function () { show(current + 1); }, 5000);
}

document.querySelector('.next').addEventListener('click', function () { show(current + 1); restart(); });
document.querySelector('.prev').addEventListener('click', function () { show(current - 1); restart(); });
dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); restart(); }); });
restart();

// Phone menu button
document.querySelector('.burger').addEventListener('click', function () {
  document.querySelector('.menu').classList.toggle('open');
});

// Swipe left or right on the slider (phones)
var startX = null;
var box = document.querySelector('.slider');
box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
box.addEventListener('touchend', function (e) {
  if (startX === null) return;
  var diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) { show(current + (diff < 0 ? 1 : -1)); restart(); }
  startX = null;
});