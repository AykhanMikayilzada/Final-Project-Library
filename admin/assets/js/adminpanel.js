let bookssearch = document.getElementById("bookssearch");
let searchbtn = document.getElementById("searchbtn");
let resultContainer = document.getElementById("resultContainer");
let searchinput = document.getElementById("searchinput");


async function searchBooks(bookTitle) {
  const apiKey = "AIzaSyB6ZzZJY3wOlJ0bi6Qymj8RREY8eKZNjhI";
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    
    

    return data.items.map((item) => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail // Resim URL'si bazen olmayabilir, bu yüzden güvenli bir şekilde erişiyoruz.
    }));
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

searchbtn.addEventListener("click", async () => {
  const bookTitleInput = bookssearch.value;

  try {
    const books = await searchBooks(bookTitleInput);
    if (bookssearch.value === "") {
      return;
    } else {
      searchinput.style.display = "block";
    }
    resultContainer.innerHTML = "";

    books.forEach((book) => {
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("results");

      const resultImg = document.createElement("img");
      resultImg.classList.add("resultImg");
      resultImg.src = book.thumbnail || "./assets/img/default_thumbnail.jpg"; // Eğer resim URL'si yoksa, varsayılan bir resim gösterilebilir.

      const resultTitle = document.createElement("p");
      resultTitle.textContent = book.title;

      const resultAuthors = document.createElement("p");
      resultAuthors.textContent = book.authors ? book.authors.join(", ") : "Unknown Author"; // Eğer yazar bilgisi yoksa, "Unknown Author" gösterilebilir.

      resultDiv.appendChild(resultImg);
      resultDiv.appendChild(resultTitle);
      resultDiv.appendChild(resultAuthors);
      resultContainer.appendChild(resultDiv);
    });

  } catch (error) {
    console.error("Hata oluştu:", error);
    resultContainer.innerHTML = "Arama sırasında bir hata oluştu.";
  }
});

bookssearch.addEventListener("keypress", async (e) => {
    const bookTitleInput = bookssearch.value;
    
    if (e.key == "Enter") {
        try {
            const bookTitles = await searchBooks(bookTitleInput);
            if(bookssearch.value == ""){
              return
            }else{
              searchinput.style.display = "block"
            }
            resultContainer.innerHTML = "";
        
            bookTitles.forEach((title) => {
              resultContainer.innerHTML += `
                <div class = "results">
                    <img class = "resultImg" src="./assets/img/clock_icon.svg" />
                    <p>${title}</p>
                </div>
                    `;
            });
          } catch (error) {
            console.error("Hata oluştu:", error);
            resultContainer.innerHTML = "Arama sırasında bir hata oluştu.";
          }
    }
    
  });
  

  async function searchBooksAndUpdateInputs(bookTitle) {
    try {
      const bookTitles = await searchBooks(bookTitle);
      if (bookTitle === "") {
        return;
      } else {
        searchinput.style.display = "block";
      }
      resultContainer.innerHTML = "";
  
      bookTitles.forEach((title) => {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("results");
  
        const resultImg = document.createElement("img");
        resultImg.classList.add("resultImg");
        resultImg.src = "./assets/img/clock_icon.svg";
  
        const resultLink = document.createElement("a");
        resultLink.textContent = title;
        resultLink.href = "#";
  
        resultLink.addEventListener("click", () => {
          
          const clickedTitle = title;

          const bookNameInput = document.getElementById("bookname");
         
          const authorNameInput = document.getElementById("authorname");
          // Book Image Url inputunu al
          const bookUrlInput = document.getElementById("bookurl");
  
          // Book Name inputuna tıklanan başlığı yaz
          bookNameInput.value = clickedTitle;
          // Diğer inputlara boş değerler ata
          authorNameInput.value = "";
          bookUrlInput.value = "";
        });
  
        resultDiv.appendChild(resultImg);
        resultDiv.appendChild(resultLink);
        resultContainer.appendChild(resultDiv);
      });
    } catch (error) {
      console.error("Hata oluştu:", error);
      resultContainer.innerHTML = "Arama sırasında bir hata oluştu.";
    }
  }
  
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
  