import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBDUmstwc_hZjzqQG7yDn4pIU-w-b9FDU",
  authDomain: "libraryprojectapp-df468.firebaseapp.com",
  databaseURL: "https://libraryprojectapp-df468-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "libraryprojectapp-df468",
  storageBucket: "libraryprojectapp-df468.appspot.com",
  messagingSenderId: "176480815398",
  appId: "1:176480815398:web:47ee903956a99357d299e7",
  measurementId: "G-2H2B66PT8G",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function getLastAddedBook() {
  try {
    const dataRef = ref(database, "books");
    const snapshot = await get(dataRef);
    const books = snapshot.val();

    if (!books) {
      console.log("No books found in the database.");
      return null;
    }

   
    const bookArray = Object.values(books);

    const lastAddedBook = bookArray[bookArray.length - 1];

    return lastAddedBook;
  } catch (error) {
    console.error("Error fetching last added book from Firebase:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const lastAddedBook = await getLastAddedBook();
    if (lastAddedBook) {
     
      const { title, author, imageUrl, descr } = lastAddedBook;

 
      const aboutLeftSide = document.getElementById("aboutLeftSide");
      const aboutRightSide = document.getElementById("aboutRightSide");
      aboutLeftSide.innerHTML = `
        <h2 id="aboutTitle">${title}</h2>
        <p id="aboutDescription">Author: ${author}</p>
        <p id="bookDescription">${descr}</p> <!-- Açıklama bilgisi buraya eklendi -->
      `;
      aboutRightSide.innerHTML = `
        <img src="${imageUrl}" class="aboutImg" />
      `;
    } else {
      console.log("No last added book found.");
    }
  } catch (error) {
    console.error("Error getting last added book:", error);
  }
});
