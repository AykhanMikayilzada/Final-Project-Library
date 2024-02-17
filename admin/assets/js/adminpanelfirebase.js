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

let addedBooks = [];

function createData(path, data) {
  const timestamp = new Date().getTime();

  data.timestamp = timestamp;
  const newRef = push(ref(database, path), data);
  return newRef.key;
}

function convertData(d) {
  const newData = Object.entries(d);

  const myNewData = newData.map((kicikArr) => {
    const newObj = {
      id: kicikArr[0],
      ...kicikArr[1],
    };
    return newObj;
  });

  return myNewData;
}

const readData = (path) => {
  const dataRef = ref(database, path);
  return get(dataRef).then((snapshot) => snapshot.val());
};

const updateData = (path, data) => {
  return update(ref(database, path), data);
};

const deleteData = (path) => {
  return remove(ref(database, path));
};

const bookname = document.getElementById("bookname");
const authorname = document.getElementById("authorname");
const bookurl = document.getElementById("bookurl");
const forumlibBtn = document.getElementById("forumlibBtn");
const bookdesc = document.getElementById("bookdesc");
const slidermomapi = document.getElementById("slidermomapi");
const alertAdminMessage = document.getElementById("alertAdminMessage");
const succesMessage = document.getElementById("succesMessage");

const homePage = window.location.pathname.includes("catalog.html");

console.log(homePage);

console.log("forumlibBtn", forumlibBtn);

if (homePage) {
  readData("/books")
    .then((data) => {
      const books = convertData(data);
      renderBooks(books);
      renderBooksa(books);
      spinnerbtn2.style.display = "none";
    })
    .catch((error) => console.log("Error reading data", error));
}

forumlibBtn?.addEventListener("click", function (e) {
  e.preventDefault();

  const title = bookname.value;
  const bookcreatetime = Date();
  const author = authorname.value;
  const imageUrl = bookurl.value;
  const descr = bookdesc.value;

  if (title !== "" && author !== "" && imageUrl !== "" && descr !== "") {
    const forum = {
      title,
      author,
      imageUrl,
      descr,
      bookcreatetime,
    };

    succesMessage.style.display = "block";
    createData("books", forum);
    console.log("forum", forum);

    setTimeout(function () {
      succesMessage.style.display = "none";
    }, 5000);
  } else {
    console.log("Bazı alanlar boş, işlem yapılmadı.");
    alertAdminMessage.style.display = "block";

    setTimeout(function () {
      alertAdminMessage.style.display = "none";
    }, 5000);
  }

  bookname.value = "";
  authorname.value = "";
  bookurl.value = "";
  bookdesc.value = "";
});




let spinnerbtn2 = document.getElementById("spinnerbtn2");

window.addEventListener("load", () => {
  spinnerbtn2.style.display = "block";
});

function renderBooks(list) {
  slidermomapi.innerHTML = list
    .map(
      (book) => `
      <div class="swiper-slide">
        <div class="slider-card1">
          <img class="book-img" src="${book.imageUrl}" alt="${book.title}"/>
          <p class="book_title">${book.title}</p>
          <p class="book_subtitle">${book.author}</p>
          <button class="readMoreText" data-book-id="${book.id}">Read more</button>
        </div>
      </div>
    `
    )
    .join("");

  swiper.update();
}

let slidernewrelease = document.getElementById("swiper_all");

function renderBooksa(list) {
  const currentTimestamp = new Date().getTime();
  const filteredBooks = list.filter(
    (book) => currentTimestamp - new Date(book.bookcreatetime) < 432000000
  );

  slidernewrelease.innerHTML = filteredBooks
    .map(
      (book) => `
      <div class="swiper-slide">
        <div class="slider-card1">
          <div class="newTag">NEW</div>
          <img class="book-img" src="${book.imageUrl}" alt="${book.title}"/>
          <p class="book_title">${book.title}</p>
          <p class="book_subtitle">${book.author}</p>
          <button class="readMoreText" data-book-id="${book.id}">Read more</button>
        </div>
      </div>
    `
    )
    .join("");

  swiper2.update();
}




let spinnerbtn = document.getElementById("spinnerbtn");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("readMoreText")) {
    const bookId = e.target.getAttribute("data-book-id");
    localStorage.setItem("bookId", bookId);
    window.location.href = "./bookPage.html";
  }
});

const elementId = localStorage.getItem("bookId");
console.log("budur", elementId);





async function GETbyID(id) {
  try {
    const response = await get(ref(database, `/books/${id}`));
    return response.val(); // Alınan veriyi döndür
  } catch (error) {
    console.error(
      "Firebase'den kitap verisi alınırken bir hata oluştu:",
      error
    );
    throw error;
  }
}





let clickCounter = 0;

function addToCart() {
  clickCounter++;

  if (clickCounter > 5) {
    const getItemm = localStorage.getItem("bookId");

    if (getItemm) {
      GETbyID(getItemm)
      .then((bookData) => {
          const bookHtml = `
            <div class="swiper-slide">
              <div class="slider-card1">
                <img class="book-img" src="${bookData.imageUrl}" alt="${bookData.title}"/>
                <p class="book_title">${bookData.title}</p>
                <p class="book_subtitle">${bookData.author}</p>
                <button class="readMoreText" data-book-id="${bookData.id}">Read more</button>
              </div>
            </div>
          `;

          console.log("bu nedir",getItemm);
          
          swiper_bestseller.innerHTML += bookHtml;
        })
        .catch((error) => {
          console.error("Firebase'den kitap verisi alınırken bir hata oluştu:", error);
        });
    } else {
      console.log("localStorage'dan kitap kimliği alınamadı.");
    }
  } else {
    console.log("Add to cart işlemi gerçekleştirilemedi, 5 defadan fazla tıklanmış.");
  }
}




async function getBookByIdFromFirebase(elementId) {
  try {
    spinnerbtn.style.display = "block";

    const bookData = await GETbyID(elementId);
    console.log("goster", bookData);

    if (bookData) {
      console.log("Firebase'den alınan kitap verisi:", bookData);

      const bookHtml = `
      <div id="leftSide" class="left-side">
      <button class="back"><a href="./catalog.html" class="backBtnText">BACK</a></button>

    
      
        <img class="book_responsive" src="${bookData.imageUrl}" />
        <div class="year">2017</div>
        <h2 class="title">${bookData.title}</h2>
        <h3 class="subtitle">2 days ago added</h3>
        <h3 class="subtitle2">${bookData.author}</h3>
        <p class="paragraph">${bookData.descr}</p>

      <button class="addtocart">
        <div class="pretext">
          <i class="fas fa-cart-plus"></i> ADD TO CART
        </div>
        <div class="pretext done">
          <div class="posttext"><i class="fas fa-check"></i> ADDED</div>
        </div>
      </button>

      </div>

      <div class="right-side">
        <img width = "379px" height = "529px" src="${bookData.imageUrl}" />
        <div class="new">NEW</div>
        </div>
        `;
      document.getElementById("sectionOne").innerHTML = bookHtml;

      spinnerbtn.style.display = "none";



       

      // --------btn js

      const button = document.querySelector(".addtocart");
      const done = document.querySelector(".done");
      console.log(button);
      let added = false;
      button.addEventListener("click", () => {

        addToCart();
        if (added) {
          done.style.transform = "translate(-110%) skew(-40deg)";
          added = false;
        } else {
          done.style.transform = "translate(0px)";
          added = true;
        }
      });
      // ---------
    } else {
      console.log("Firebase'den kitap verisi bulunamadı.");
    }
  } catch (error) {
    console.error(
      "Firebase'den kitap verisi alınırken bir hata oluştu:",
      error
    );
  }
}







const getItemm = localStorage.getItem("bookId");

console.log(getItemm);

if (getItemm) {
  getBookByIdFromFirebase(getItemm);
} else {
  console.log("localStorage'dan kitap kimliği alınamadı.");
}


const swiper = new Swiper(".swiper.mySwiper", {
  slidesPerView: 5,
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

const swiper2 = new Swiper(".swiper.mySwiper2", {
  slidesPerView: 5,
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});



const swiper3 = new Swiper(".swiper.mySwiper3", {
  slidesPerView: 5,
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});