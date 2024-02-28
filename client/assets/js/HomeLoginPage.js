
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
const dbref = ref(db);


let HomeRegisterEmail = document.getElementById("HomeRegisterEmail");
let HomeRegisterPassword = document.getElementById("HomeRegisterPassword");
let HomeLoginMainForm = document.getElementById("HomeLoginMainForm");
let forgotpasslabelHome = document.getElementById("forgotpasslabelHome");
let alertloginerrorHome = document.getElementById("alertloginerrorHome");
let alertpassresetHome = document.getElementById("alertpassresetHome");
let JoinUsTitleHome = document.getElementById("JoinUsTitleHome");



let SignInUser = evt => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, HomeRegisterEmail.value, HomeRegisterPassword.value)
    .then((credentials) => {
        get(child(dbref, 'HomeUsersAuthListregister/' + credentials.user.uid)).then((snapshot)=>{
            
            if(snapshot.exists){
                sessionStorage.setItem("user-info", JSON.stringify({
                    firstname: snapshot.val().firstname,
                    lastname: snapshot.val().lastname,
                }))
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.location.href = 'index.html'
            }
            
        })
        
    })
    .catch((error)=>{
        alertloginerrorHome.style.display = "block"
        alertpassresetHome.style.display = "none"
        JoinUsTitleHome.style.display = "block"

            console.error("Authentication error:", error);
        
    })
}

let ForgotPassowrd = ()=>{
    sendPasswordResetEmail(auth, HomeRegisterEmail.value)
    .then(()=>{
        alertpassresetHome.style.display = "block"
        JoinUsTitleHome.style.display = "none"
        alertloginerrorHome.style.display = "none"
        
    })
    .catch((error)=>{
        console.log(error.code);
        console.log(error.message);
    })
}

HomeLoginMainForm.addEventListener('submit', SignInUser);
forgotpasslabelHome.addEventListener('click', ForgotPassowrd);
