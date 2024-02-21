import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8wxVUufHaPzXHaMIIgybcyKcpWvH_k_o",
  authDomain: "contactuslibraryapp-c9339.firebaseapp.com",
  databaseURL:
    "https://contactuslibraryapp-c9339-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "contactuslibraryapp-c9339",
  storageBucket: "contactuslibraryapp-c9339.appspot.com",
  messagingSenderId: "300093896508",
  appId: "1:300093896508:web:9f963d59f04bc4f7371039",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactAddress = document.getElementById("contactAddress");
const contactPhone = document.getElementById("contactPhone");
const contactTextarea = document.getElementById("contactTextarea");
const contactSendBtn = document.getElementById("contactSendBtn");

contactSendBtn.addEventListener("click", function () {
  const contactInfo = {
    contactName: contactName.value,
    contactEmail: contactEmail.value,
    contactAddress: contactAddress.value,
    contactPhone: contactPhone.value,
    contactTextarea: contactTextarea.value,
  };

  const newContactRef = push(ref(db, "contacts/"));

  set(newContactRef, contactInfo)
    .then(() => {
      alert("İletişim bilgileriniz başarıyla gönderildi!");
      contactName.value = "";
      contactEmail.value = "";
      contactAddress.value = "";
      contactPhone.value = "";
      contactTextarea.value = "";
    })
    .catch((error) => {
      console.error("Hata oluştu: ", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin!");
    });
});
