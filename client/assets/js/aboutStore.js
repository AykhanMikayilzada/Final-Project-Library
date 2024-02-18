const aboutStoreName = localStorage.getItem("aboutStoreName");

if (aboutStoreName) {
    console.log("aboutStoreName:", aboutStoreName);
} else {
    console.log("aboutStoreName bulunamadı.");
}

async function searchBooks(bookTitle) {
    const apiKey = "AIzaSyB6ZzZJY3wOlJ0bi6Qymj8RREY8eKZNjhI";
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
  
  // Bu kısımda API'den gelen verileri kullanarak aboutTitle, aboutDescription ve aboutImage içeriğini doldurun
  async function updateAboutPageWithBookInfo(bookTitle) {
    try {
      const books = await searchBooks(bookTitle);
      if (books.length === 0) {
        console.log("No books found with the given title.");
        return;
      }
  
      // İlk kitabı seçiyoruz (diğer kitapları da kullanabilirsiniz)
      const book = books[0];
      const aboutTitle = document.getElementById("aboutTitle");
      const aboutDescription = document.getElementById("aboutDescription");
      const aboutImage = document.getElementById("aboutImage");
  
      // aboutTitle içeriğini güncelle
      aboutTitle.textContent = book.volumeInfo.title || "No title available";
  
      // aboutDescription içeriğini güncelle
      aboutDescription.textContent = book.volumeInfo.description || "No description available";
  
      // aboutImage içeriğini güncelle
      aboutImage.src = book.volumeInfo.imageLinks?.thumbnail || "./assets/img/default_thumbnail.jpg";
      aboutImage.alt = book.volumeInfo.title || "No title available";
  
    } catch (error) {
      console.error("An error occurred while updating about page:", error);
    }
  }
  
  // Bu kısımda sayfa yüklendiğinde veya bir olay gerçekleştiğinde updateAboutPageWithBookInfo fonksiyonunu çağırın
  document.addEventListener("DOMContentLoaded", function() {
    updateAboutPageWithBookInfo(aboutStoreName);
  });