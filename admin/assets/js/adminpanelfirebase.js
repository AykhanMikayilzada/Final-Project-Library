
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyBBDUmstwc_hZjzqQG7yDn4pIU-w-b9FDU",
//     authDomain: "libraryprojectapp-df468.firebaseapp.com",
//     projectId: "libraryprojectapp-df468",
//     storageBucket: "libraryprojectapp-df468.appspot.com",
//     messagingSenderId: "176480815398",
//     appId: "1:176480815398:web:47ee903956a99357d299e7",
//     measurementId: "G-2H2B66PT8G"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);


//   import { initializeApp } from 'firebase/app';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   //...
// };



// const app = initializeApp(firebaseConfig);

  // console.log("app:", app, analytics);




// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBBDUmstwc_hZjzqQG7yDn4pIU-w-b9FDU",
    authDomain: "libraryprojectapp-df468.firebaseapp.com",
    databaseURL: "https://libraryprojectapp-df468-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "libraryprojectapp-df468",
    storageBucket: "libraryprojectapp-df468.appspot.com",
    messagingSenderId: "176480815398",
    appId: "1:176480815398:web:47ee903956a99357d299e7",
    measurementId: "G-2H2B66PT8G"
  };
  // const analytics = getAnalytics(app);
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  const createData = (path, data) => {
    const newRef = push(ref(database, path), data);
    return newRef.key;
  };
  
  const readData = (path) => {
    const dataRef = ref(database, path);
    return get(dataRef).then((snapshot) => snapshot.val());
  };
  
  const updateData = (path, data) => {
    return update(ref(database, path), data);
  };
  
  const deleteData = (path) => {
    return remove(ref(database, path));
  };
  
  const bookname = document.getElementById("bookname");
  const authorname = document.getElementById("authorname");
  const bookurl = document.getElementById("bookurl");
  const forumlibBtn = document.getElementById("forumlibBtn");
  const bookdesc = document.getElementById("bookdesc");
  
  forumlibBtn.addEventListener("click", function(e){
    e.preventDefault();
  
    const title = bookname.value;
    const author = authorname.value;
    const imageUrl = bookurl.value;
    const descr = bookdesc.value;
  
    const forum = {
      title,
      author,
      imageUrl,
      descr,
    };
  
    createData("books", forum);
    alert("added book");
    console.log("forum", forum);
  });