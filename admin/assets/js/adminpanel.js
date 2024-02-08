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
    console.log(data);
    // const bookTitles = data.items.forEach((item) => item.volumeInfo.title);

    return data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

searchbtn.addEventListener("click", async () => {
  const bookTitleInput = bookssearch.value;

  try {
    const bookTitles = await searchBooks(bookTitleInput);
    console.log(bookTitles);

  
    if(bookssearch.value == ""){
      return
    }else{
      searchinput.style.display = "block"
    }
    searchinput.innerHTML = "";

    searchinput.innerHTML += bookTitles.items.forEach((title) => {
      console.log(title.volumeInfo.title);
  
      return `
        <div class = "results">
            <img class = "resultImg" src="./assets/img/clock_icon.svg" />
            <p>${title.volumeInfo.title}</p>
            <p>${title.volumeInfo.authors}</p>
        </div>
            `;
    });



  } catch (error) {
    console.error("Hata oluştu:", error);
    searchinput.innerHTML = "Arama sırasında bir hata oluştu.";
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
            searchinput.innerHTML = "";
        
            searchinput.innerHTML +=  bookTitles.items.forEach((title) => {
             return`
                <div class = "results">
              <img class = "resultImg" src="./assets/img/clock_icon.svg" />
            <p>${title.volumeInfo.title}</p>
            <p>${title.volumeInfo.authors}</p>
                </div>
                    `;
            });
          } catch (error) {
            console.error("Hata oluştu:", error);
            searchinput.innerHTML = "Arama sırasında bir hata oluştu.";
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
      searchinput.innerHTML = "";
  
      bookTitles.items.forEach((title) => {
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

          const bookUrlInput = document.getElementById("bookurl");
  
 
          bookNameInput.value = clickedTitle;
 
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
  