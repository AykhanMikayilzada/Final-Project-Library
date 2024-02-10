const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const bookName = document.querySelector("#bookName");
const bookAutor = document.querySelector("#bookAutor");
const bookDescription = document.querySelector("#bookDescription");
const bookImg = document.querySelector("#bookImg")

async function searchBooks(bookTitle) {
  const apiKey = "AIzaSyB6ZzZJY3wOlJ0bi6Qymj8RREY8eKZNjhI"; // Replace "YOUR_API_KEY" with your actual API key
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.items || []; // If there's no data, return an empty array
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Function to create a book card
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

// Function to render book cards
function renderBooks(books) {
  swiperWrapper.innerHTML = ""; // Clear previous search results
  books.forEach(book => {
    const bookCard = createBookCard(book.volumeInfo);
    swiperWrapper.appendChild(bookCard);
  });
}

// Event listener for the search button click
searchBtn.addEventListener("click", async () => {
  const bookTitle = searchInput.value.trim();

  if (bookTitle !== "") {
    try {
      // Search for books
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

