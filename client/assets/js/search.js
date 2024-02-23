const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const bookName = document.querySelector("#bookName");
const bookAutor = document.querySelector("#bookAutor");
const bookDescription = document.querySelector("#bookDescription");
const bookImg = document.querySelector("#bookImg")

async function searchBooks(bookTitle) {
  const apiKey = "AIzaSyB6ZzZJY3wOlJ0bi6Qymj8RREY8eKZNjhI"; 
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.items || []; 
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}


function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("swiper-slide");

  const bookContent = `
    <div class="swiper_book">
      <div class="book_card">
        <img class="bookImg" src="${book.imageLinks?.thumbnail || '../client/assets/img/book1.svg'}" />
        <div class="about_book">
          <span class="book_name">${book.title || 'No Title Available'}</span>
          <span class="book_autor">${book.authors ? book.authors.join(", ") : 'Unknown Author'}</span>
          <p class="bookDescription">${book.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  `;
  bookCard.innerHTML = bookContent;

  return bookCard;
}


function renderBooks(books) {
  swiperWrapper.innerHTML = ""; 
  books.forEach(book => {
    const bookCard = createBookCard(book.volumeInfo);
    swiperWrapper.appendChild(bookCard);
  });
}

searchBtn.addEventListener("click", async () => {
  const bookTitle = searchInput.value.trim();

  if (bookTitle !== "") {
    try {
      const books = await searchBooks(bookTitle);

      if (books.length > 0) {
        renderBooks(books);
        console.log("Search Results:", books);
      } else {
        console.log("No results found.");
        swiperWrapper.innerHTML = "<p>No results found</p>";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

