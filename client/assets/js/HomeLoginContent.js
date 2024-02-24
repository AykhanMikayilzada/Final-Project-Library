

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  child
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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



// Firebase'i başlatın
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);



let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let MsgHead = document.getElementById("msg");
let GreetHead = document.getElementById("greet");
let SignoutBtn = document.getElementById("signoutbutton");




let Signout = ()=>{
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'index.html'
}

let CheckCred = ()=>{
    if (!sessionStorage.getItem("user-creds"))
    window.location.href = "index.html"

    else {
        MsgHead.innerHTML = `${UserCreds.email}: `;
        GreetHead.innerHTML = ` &nbsp; ${UserInfo.firstname} ${UserInfo.lastname}`;


    }
}

window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);



let users = [];

function getUsersFromFirebase() {
    get(child(ref(db), 'HomeUsersAuthListregister/')).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            let userData = childSnapshot.val();
            users.push(userData);
        });
        // Kullanıcıları ekrana yazdırın
        displayUsers(users);
    }).catch((error) => {
        console.error("Error getting users: ", error);
    });
}



function displayUsers(users) {
    console.log(users);
    let userListHTML = '<ul>';
    users.forEach(function(user) {
        userListHTML += `<li>${user.firstname} ${user.lastname}, <br></li>`;
    });
    userListHTML += '</ul>';
    document.getElementById('firedatalog').innerHTML = userListHTML;
}


window.addEventListener('load', getUsersFromFirebase);