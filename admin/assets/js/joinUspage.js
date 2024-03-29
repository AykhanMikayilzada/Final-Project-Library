import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";



const firebaseConfig4 = {
  apiKey: "AIzaSyBilJ9Sx0kgyFkyDr6iRgJLI3WKBD3cO8M",
  authDomain: "joinusappdb.firebaseapp.com",
  databaseURL: "https://joinusappdb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "joinusappdb",
  storageBucket: "joinusappdb.appspot.com",
  messagingSenderId: "599092674811",
  appId: "1:599092674811:web:844fd7463593dd824b705e"
};

// Initialize Firebase
const app4 = initializeApp(firebaseConfig4);
const db4 = getDatabase();
const auth4 = getAuth(app4);

let EmailInp = document.getElementById("emailInp");
let PassInp = document.getElementById("passwordInp");
let FnameInp = document.getElementById("Fnameinp");
let LnameInp = document.getElementById("lnameInp");
let MainForm = document.getElementById("Mainform");

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth4, EmailInp.value, PassInp.value)
    .then((credentials) => {
        set(ref(db4, 'UsersAuthList/' + credentials.user.uid),{
            firstname: FnameInp.value,
            lastname: LnameInp.value
        })
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

MainForm.addEventListener('submit', RegisterUser);
