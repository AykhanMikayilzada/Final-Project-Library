import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
const firebaseConfig4 = {
  apiKey: "AIzaSyBilJ9Sx0kgyFkyDr6iRgJLI3WKBD3cO8M",
  authDomain: "joinusappdb.firebaseapp.com",
  databaseURL: "https://joinusappdb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "joinusappdb",
  storageBucket: "joinusappdb.appspot.com",
  messagingSenderId: "599092674811",
  appId: "1:599092674811:web:844fd7463593dd824b705e"
};
const app4 = initializeApp(firebaseConfig4);
const db4 = getDatabase(app4);
window.addEventListener('load', function() {
    const contactSendBtn = document.getElementById("contactSendBtn");
    if (contactSendBtn) {
        contactSendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentTime = new Date().getTime(); // Şu anki zamanı al
            set(ref(db4, 'userinfo/' + document.getElementById("contactName").value), {
                createTime: currentTime,
                contactName: document.getElementById("contactName").value,
                contactEmail: document.getElementById("contactEmail").value,
                PhoneNumber: document.getElementById("contactPhone").value,
                contactAddress: document.getElementById("contactAddress").value,
                contactTextarea: document.getElementById("contactTextarea").value
            }).then(() => {
                alert("melumatlar elave olundu!");
            }).catch((error) => {
                console.error("Veri eklenirken hata oluştu: ", error);
                alert("Bilgiler eklenirken bir hata oluştu!");
            });
        });
    } else {
        console.error("Contact button not found!");
    }
    getUsersFromFirebase2();
});
function sortByCreatedAtDesc(users) {
    return users.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
    });
}
function getUsersFromFirebase2() {
    let users2 = [];
    get(child(ref(db4), 'userinfo/')).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            let userData2 = childSnapshot.val();
            users2.push({ id: childSnapshot.key, ...userData2 });
        });
        users2.sort((a, b) => b.createTime - a.createTime);
        displayUsers2(users2);
    }).catch((error) => {
        console.error("user and error ", error);
    });
}
function displayUsers2(users2) {
    // Verileri zamanlarına göre sırala
    const sortedUsers = sortByCreatedAtDesc(users2);
    let userListHTML = '<ul>';
    sortedUsers.forEach(function(user, index) {
        userListHTML += `<td>${index + 1}. ${user.contactName}</td> <td>${user.contactAddress}</td> <td>${user.contactEmail}</td> <td>${user.contactTextarea}</td> <td>${user.PhoneNumber}</td><tr>`;
    });
    userListHTML += '</ul>';
    document.getElementById('contactUs').innerHTML = userListHTML;
}