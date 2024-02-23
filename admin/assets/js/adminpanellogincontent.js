// Ana dosya
const firebaseConfig = {
    apiKey: "AIzaSyBilJ9Sx0kgyFkyDr6iRgJLI3WKBD3cO8M",
    authDomain: "joinusappdb.firebaseapp.com",
    databaseURL: "https://joinusappdb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "joinusappdb",
    storageBucket: "joinusappdb.appspot.com",
    messagingSenderId: "599092674811",
    appId: "1:599092674811:web:844fd7463593dd824b705e"
  };



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase'i başlatın
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);



let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
let MsgHead = document.getElementById("msg");
let GreetHead = document.getElementById("greet");
let SignoutBtn = document.getElementById("signoutbutton");
let signoutbuttonres = document.getElementById("signoutbuttonres");



let Signout = ()=>{
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login1.html'
}

let CheckCred = ()=>{
    if (!sessionStorage.getItem("user-creds"))
    window.location.href = "login1.html"

    else {
        MsgHead.innerHTML = `${UserCreds.email}: `;
        GreetHead.innerHTML = ` &nbsp; ${UserInfo.firstname} ${UserInfo.lastname}`;


    }
}

window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);
signoutbuttonres.addEventListener('click', Signout)


let users = [];

function getUsersFromFirebase() {
    get(child(ref(db), 'UsersAuthList/')).then((snapshot) => {
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
    let userListHTML = '<ul>';
    users.forEach(function(user) {
        userListHTML += `<li>${user.firstname} ${user.lastname}, <br></li>`;
    });
    userListHTML += '</ul>';
    document.getElementById('firedatalog').innerHTML = userListHTML;
}


window.addEventListener('load', getUsersFromFirebase);