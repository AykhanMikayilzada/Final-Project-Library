
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBDUmstwc_hZjzqQG7yDn4pIU-w-b9FDU",
  authDomain: "libraryprojectapp-df468.firebaseapp.com",
  databaseURL:
    "https://libraryprojectapp-df468-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "libraryprojectapp-df468",
  storageBucket: "libraryprojectapp-df468.appspot.com",
  messagingSenderId: "176480815398",
  appId: "1:176480815398:web:47ee903956a99357d299e7",
  measurementId: "G-2H2B66PT8G",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

let HomeRegisterEmail = document.getElementById("HomeRegisterEmail");
let HomeRegisterPassword = document.getElementById("HomeRegisterPassword");
let HomeRegisterFirstname = document.getElementById("HomeRegisterFirstname");
let HomeRegisterLastname = document.getElementById("HomeRegisterLastname");
let homeregisterMainForm = document.getElementById("homeregisterMainForm");

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, HomeRegisterEmail.value, HomeRegisterPassword.value)
    .then((credentials) => {
        set(ref(db, 'HomeUsersAuthListregister/' + credentials.user.uid),{
            firstname: HomeRegisterFirstname.value,
            lastname: HomeRegisterLastname.value
        })
        alert("Duzgun giris olundu")
    })
    .catch((error)=>{
      alert("xsten girdin")
            console.error("Authentication error:", error);
        
    })
}

homeregisterMainForm.addEventListener('submit', RegisterUser);
