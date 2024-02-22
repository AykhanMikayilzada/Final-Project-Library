
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyBilJ9Sx0kgyFkyDr6iRgJLI3WKBD3cO8M",
  authDomain: "joinusappdb.firebaseapp.com",
  databaseURL: "https://joinusappdb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "joinusappdb",
  storageBucket: "joinusappdb.appspot.com",
  messagingSenderId: "599092674811",
  appId: "1:599092674811:web:844fd7463593dd824b705e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);


let EmailInp = document.getElementById("emailInp");
let PassInp = document.getElementById("passwordInp");
let MainForm = document.getElementById("Mainform");
let ForgotPassLabel = document.getElementById("forgotpasslabel");
let alertloginerror = document.getElementById("alertloginerror");
let alertpassreset = document.getElementById("alertpassreset");
let welcomeadm = document.getElementById("welcomeadm");


let SignInUser = evt => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) => {
        get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot)=>{
            if(snapshot.exists){
                sessionStorage.setItem("user-info", JSON.stringify({
                    firstname: snapshot.val().firstname,
                    lastname: snapshot.val().lastname
                }))
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.location.href = 'adminpanel.html'
            }
        })
    })
    .catch((error)=>{
        alertloginerror.style.display = "block"
        alertpassreset.style.display = "none"
        welcomeadm.style.display = "block"
    })
}

let ForgotPassowrd = ()=>{
    sendPasswordResetEmail(auth, EmailInp.value)
    .then(()=>{
        alertpassreset.style.display = "block"
        welcomeadm.style.display = "none"
        alertloginerror.style.display = "none"
    })
    .catch((error)=>{
        console.log(error.code);
        console.log(error.message);
    })
}

MainForm.addEventListener('submit', SignInUser);
ForgotPassLabel.addEventListener('click', ForgotPassowrd);
