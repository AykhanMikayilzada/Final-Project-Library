let bookssearch = document.getElementById("bookssearch");
let searchbtn = document.getElementById("searchbtn");

async function searchBooks(bookTitle) {
    const apiKey = "AIzaSyB6ZzZJY3wOlJ0bi6Qymj8RREY8eKZNjhI"; // API anahtarınızı buraya girin
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Kitapların isimlerini içeren bir dizi oluştur
        const bookTitles = data.items.map(item => item.volumeInfo.title);
        
        return bookTitles;
    } catch (error) {
        console.error("API isteği sırasında bir hata oluştu:", error);
        return []; // Hata durumunda boş bir dizi döndürür
    }
}

// Örnek kullanım

searchbtn.addEventListener("click", ()=>{
    const bookTitleInput = bookssearch.value; // Aranacak kitap ismi
searchBooks(bookTitleInput)
    .then(bookTitles => {
        console.log("Aranan kitapların isimleri:", bookTitles);
    })
    .catch(error => {
        console.error("Hata oluştu:", error);
    });

});