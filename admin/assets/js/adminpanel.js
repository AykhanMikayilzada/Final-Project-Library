let bookssearch = document.getElementById("bookssearch");
let searchbtn = document.getElementById("searchbtn");
let resultContainer = document.getElementById("resultContainer");
let searchinput = document.getElementById("searchinput");

async function searchBooks(bookTitle) {
  const apiKey = "AIzaSyCVtMpxzTaMGA2Q2W404nTt5OHhd9B7n_w";
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&key=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.items;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

async function searchBooksAndUpdateInputs(bookTitle) {
  try {
    const books = await searchBooks(bookTitle);
    if (bookTitle === "") {
      return;
    } else {
      searchinput.style.display = "block";
    }
    resultContainer.innerHTML = "";

    books.forEach((book) => {
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("results");
      resultDiv.classList.add("clickable");

      const resultImg = document.createElement("img");
      resultImg.classList.add("resultImg");
      resultImg.src =
        book.volumeInfo.imageLinks?.thumbnail ||
        "./assets/img/default_thumbnail.jpg";

      const resultTitle = document.createElement("p");
      resultTitle.textContent = book.volumeInfo.title;

      const resultAuthors = document.createElement("p");
      resultAuthors.textContent = book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author";

      const resultDesc = document.createElement("p");
      resultDesc.textContent = book.volumeInfo.description;

      resultDiv.addEventListener("click", () => {
        const bookNameInput = document.getElementById("bookname");
        const authorNameInput = document.getElementById("authorname");
        const bookUrlInput = document.getElementById("bookurl");
        const bookDescInput = document.getElementById("bookdesc");

        bookNameInput.value = book.volumeInfo.title || "";
        authorNameInput.value = book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Unknown Author";
        bookUrlInput.value = book.volumeInfo.imageLinks?.thumbnail || "";
        bookDescInput.value = book.volumeInfo.description || "";

        // About store bölümündeki inputları doldur
        document.querySelector("#aboutStoreName").value =
          book.volumeInfo.title || "";
        document.querySelector("#aboutStoreImg").value =
          book.volumeInfo.imageLinks?.thumbnail || "";
        document.querySelector("#aboutStoreDescr").value =
          book.volumeInfo.description || "";
      });

      resultDiv.appendChild(resultImg);
      resultDiv.appendChild(resultTitle);
      resultDiv.appendChild(resultAuthors);
      resultContainer.appendChild(resultDiv);
    });
  } catch (error) {
    console.error("Hata oluştu:", error);
    resultContainer.innerHTML = "Arama sırasında bir hata oluştu.";
  }
}

bookssearch.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const bookTitleInput = bookssearch.value.trim();
    if (bookTitleInput === "") {
      resultContainer.innerHTML = "";
      searchinput.style.display = "none";
      return;
    }
    await searchBooksAndUpdateInputs(bookTitleInput);
  }
});

searchbtn.addEventListener("click", async () => {
  const bookTitleInput = bookssearch.value.trim();
  if (bookTitleInput === "") {
    resultContainer.innerHTML = "";
    searchinput.style.display = "none";
    return;
  }
  await searchBooksAndUpdateInputs(bookTitleInput);
});

searchbtn.addEventListener("click", async () => {
  const bookTitleInput = bookssearch.value;
  await searchBooksAndUpdateInputs(bookTitleInput);
});

bookssearch.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const bookTitleInput = bookssearch.value;
    await searchBooksAndUpdateInputs(bookTitleInput);
  }
});

document.getElementById("aboutAddBtn").addEventListener("click", function() {
    const aboutStoreName = document.getElementById("aboutStoreName").value;

    localStorage.setItem("aboutStoreName", aboutStoreName);
});