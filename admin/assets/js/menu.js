const menuBar = document.querySelector(".menuBar");
const hamburger = document.querySelector(".hamburger");
function openMenu() {
    menuBar.style.animation = "fadeIn 0.5s"
  setTimeout(function () {
    menuBar.style.display = "block";
  }, 300);
}
function closeMenu() {
    menuBar.style.animation = "fadeOut 0.5s"
  setTimeout(function () {
    menuBar.style.display = "none";
  }, 300);
//   .fade-out {
//     animation: fadeOut 2s;
//       opacity: 0;
//   }

}
