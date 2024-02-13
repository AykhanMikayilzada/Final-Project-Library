const menuBar = document.querySelector(".menuBar");
const hamburger = document.querySelector(".hamburger");
function openMenu() {
    menuBar.style.animation = "fadeIn 0.2s"
  setTimeout(function () {
    menuBar.style.display = "block";
  }, 200);
}
function closeMenu() {
    menuBar.style.animation = "fadeOut 0.2s"
  setTimeout(function () {
    menuBar.style.display = "none";
  }, 200);
}
