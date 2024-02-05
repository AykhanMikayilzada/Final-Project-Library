const show = document.querySelector(".show");
const hide = document.querySelector(".hide");
const joinBtn = document.querySelector(".joinBtn");
const userInpt = document.querySelector(".userInpt");
const passwordInpt = document.querySelector(".passwordInpt");
const alerts = document.querySelector(".alerts");

joinBtn.addEventListener("click", () => {
  if (userInpt.value == "" || passwordInpt.value == "") {
    alerts.innerHTML = `
          <div class="alert alert-warning" role="alert">
          You didn't fill in all the boxes!
          </div>
          `;
  }
  else {
    alerts.innerHTML = ""
    return;
  }
});

function showPassword() {
  show.style.display = "none";
  hide.style.display = "block";
  passwordInpt.type = "text";
}
function hidePassword() {
  hide.style.display = "none";
  show.style.display = "block";
  passwordInpt.type = "password";
}
