import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBDUmstwc_hZjzqQG7yDn4pIU-w-b9FDU",
  authDomain: "libraryprojectapp-df468.firebaseapp.com",
  databaseURL:
    "https://libraryprojectapp-df468-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "libraryprojectapp-df468",
  storageBucket: "libraryprojectapp-df468.appspot.com",
  messagingSenderId: "176480815398",
  appId: "1:176480815398:web:47ee903956a99357d299e7",
  measurementId: "G-2H2B66PT8G",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const anonimComment = document.querySelector(".anonimComment");
const sendBtn = document.querySelector(".sendBtn");
const clearCommentsButton = document.querySelector(".clearCommentsButton");
const comments = document.querySelector(".comments");
const bookId = localStorage.getItem("bookId");

if (bookId) {
  get(ref(database, `books/${bookId}`))
    .then((snapshot) => {
      const bookData = snapshot.val();
      if (bookData) {
        console.log("Kitap Bilgileri:", bookData);
      } else {
        console.log("Belirtilen kimlikte kitap bulunamadı.");
      }
    })
    .catch((error) => {
      console.error(
        "Firebase'den kitap bilgisi alınırken bir hata oluştu:",
        error
      );
    });
} else {
  console.log("localStorage'dan kitap kimliği alınamadı.");
}

sendBtn.addEventListener("click", () => {
  if (anonimComment.value == "") {
    alert("Input duzgun dolmayib")
    return;
  } else {
    const commentRef = ref(database, `books/${bookId}/comments`);
    const newCommentValue = anonimComment.value;

    // Yeni yorumu Firebase veritabanına eklemek için push yöntemini kullanın
    push(commentRef, newCommentValue)
      .then((newCommentRef) => {
        console.log("Yeni yorum başarıyla eklendi.");
        anonimComment.value = ""; // Input alanını temizle

        // Yorumun eklendiği zamanı al
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentDay = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        });

        // Eklenen yorumun veritabanından alınması
        get(newCommentRef)
          .then((snapshot) => {
            const newCommentData = snapshot.val();

            // Yorumun eklendiği HTML içeriğini oluştur
            const newCommentHTML = `
            <div class="commentArea">
              <div class="nameAndDate">
                <span>anonim</span>
                <span>${currentHour}:${currentMinute} ${currentDay}</span>
                <p class="comment">${newCommentData}</p>
              </div>
            </div>`;

            // Yorum bölgesine HTML içeriğini ekle
            const commentsContainer = document.querySelector(".comments");
            commentsContainer.innerHTML += newCommentHTML;
          })
          .catch((error) => {
            console.error(
              "Yeni yorum veritabanından alınırken bir hata oluştu:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Yorum eklenirken bir hata oluştu:", error);
      });
  }
});

function loadComments() {
  const commentRef = ref(database, `books/${bookId}/comments`);

  get(commentRef)
    .then((snapshot) => {
      const comments = snapshot.val();

      if (comments) {
        const commentsContainer = document.querySelector(".comments");
        commentsContainer.innerHTML = ""; // Önceki yorumları temizle

        Object.values(comments).forEach((comment) => {
          const currentDate = new Date();
          const currentHour = currentDate.getHours();
          const currentMinute = currentDate.getMinutes();
          const currentDay = currentDate.toLocaleDateString("en-US", {
            weekday: "long",
          });

          const commentHTML = `
            <div class="commentArea">
              <div class="nameAndDate">
                <span>anonim</span>
                <span>${currentHour}:${currentMinute} ${currentDay}</span>
                <p class="comment">${comment}</p>
              </div>
            </div>`;

          commentsContainer.innerHTML += commentHTML;
        });
      }
    })
    .catch((error) => {
      console.error("Yorumlar alınırken bir hata oluştu:", error);
    });
}

window.addEventListener("load", loadComments);
