const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const swiperWrapper = document.querySelector(".swiper-wrapper");

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

async function getBooks() {
  try {
    const booksRef = ref(database, 'books');
    const snapshot = await get(booksRef);
    
    if (snapshot.exists()) {
      const books = [];
      snapshot.forEach((childSnapshot) => {
        const book = childSnapshot.val();
        books.push(book);
      });
      return books;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

async function showAllBooks() {
  try {
    const books = await getBooks();
    swiperWrapper.innerHTML = '';

    books.forEach(item => {
      swiperWrapper.innerHTML += `
        <div class="swiper-slide">
          <div class="swiper_book">
            <div class="book_card">
              <img class="bookImg" src="${item.imageUrl || '../client/assets/img/book1.svg'}" />
              <div class="about_book">
                <span class="book_name">${item.title || 'No Title Available'}</span>
                <span class="book_autor">${item.author || 'Unknown Author'}</span>
                <p class="bookDescription">${item.descr || 'No description available.'}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error showing all books:", error);
  }
}

async function searchBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  try {
    const books = await getBooks();

    const matchingBooks = books.filter(book => {
      return book.title.toLowerCase().includes(searchTerm);
    });

    swiperWrapper.innerHTML = '';

    matchingBooks.forEach(item => {
      swiperWrapper.innerHTML += `
        <div class="swiper-slide">
          <div class="swiper_book">
            <div class="book_card">
              <img class="bookImg" src="${item.imageUrl || '../client/assets/img/book1.svg'}" />
              <div class="about_book">
                <span class="book_name">${item.title || 'No Title Available'}</span>
                <span class="book_autor">${item.author || 'Unknown Author'}</span>
                <p class="bookDescription">${item.descr || 'No description available.'}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error searching books:", error);
  }
}

searchBtn.addEventListener('click', searchBooks);
searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchBooks();
  }
});

document.addEventListener('DOMContentLoaded', showAllBooks);