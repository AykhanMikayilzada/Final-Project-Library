const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactAdress = document.querySelector("#contactAdress");
const contactPhone = document.querySelector("#contactPhone");
const contactTextarea = document.querySelector("#contactTextarea");
const textLength = document.querySelector("#textLength");
const contactSendBtn = document.querySelector("#contactSendBtn");
const contactErrorMessage = document.querySelector("#contactErrorMessage");
const contactSuccessMessage = document.querySelector("#contactSuccessMessage");

function letterCounter() {
  let enteredText = contactTextarea.value;
  let letterCount = enteredText.length;
  if (letterCount > 100) {
    contactTextarea.value = enteredText.substring(0, 100);
    letterCount = 100;
  }
  textLength.textContent = letterCount;
}

contactSendBtn.addEventListener("click", function () {


  if (
    contactName.value.trim() === "" ||
    contactEmail.value.trim() === "" ||
    contactAdress.value.trim() === "" ||
    contactPhone.value.trim() === "" ||
    contactTextarea.value.trim() === "" ||
    contactEmail.value.trim() === ""
  ) {
    contactErrorMessage.style.display = "block";
    setTimeout(() => {
      contactErrorMessage.style.display = "none";
    }, 1500);
    return;
  }

  const contactInfo = {
    contactName: contactName.value,
    contactEmail: contactEmail.value,
    contactAdress: contactAdress.value,
    contactPhone: contactPhone.value,
    contactTextarea: contactTextarea.value,
  };


  contactSuccessMessage.style.display = "block";

  setTimeout(() => {
    contactSuccessMessage.style.display = "none";
    contactName.value = "";
    contactEmail.value = "";
    contactAdress.value = "";
    contactPhone.value = "";
    contactTextarea.value = "";
  }, 1500);
});