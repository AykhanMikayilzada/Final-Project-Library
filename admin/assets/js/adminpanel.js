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

    const bookTitles = data.items.map((item) => item.volumeInfo.title);

    return bookTitles;
  } catch (error) {
    console.error("API isteği sırasında bir hata oluştu:", error);
    return [];
  }
}

searchbtn.addEventListener("click", async () => {
  const bookTitleInput = bookssearch.value;

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
  