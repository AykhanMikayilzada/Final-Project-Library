import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyBBDUmstwc_hZjzqQG7yDn4pIU-w-b9FDU",
    authDomain: "libraryprojectapp-df468.firebaseapp.com",
    databaseURL: "https://libraryprojectapp-df468-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "libraryprojectapp-df468",
    storageBucket: "libraryprojectapp-df468.appspot.com",
    messagingSenderId: "176480815398",
    appId: "1:176480815398:web:47ee903956a99357d299e7",
    measurementId: "G-2H2B66PT8G"
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

  function convertData(d){
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

  const homePage = window.location.pathname.includes("catalog.html")

  console.log(homePage);

  console.log("forumlibBtn", forumlibBtn);

  if(homePage){
    readData("/books")
    .then((data) =>{
      const books = convertData(data)
      renderBooks(books)
      renderBooksa(books)
    }
    )
    .catch((error) => console.log("Error reading data", error))
  }

  
  forumlibBtn?.addEventListener("click", function(e){

    e.preventDefault();
  
    const title = bookname.value;
    const bookcreatetime = Date();
    const author = authorname.value;
    const imageUrl = bookurl.value;
    const descr = bookdesc.value;
  
    const forum = {
      title,
      author,
      imageUrl,
      descr,
      bookcreatetime
    };
  
    createData("books", forum);
    alert("added book");
    console.log("forum", forum);
  });

 


  function renderBooks(list) {
    console.log("list",list);


    slidermomapi.innerHTML = list.map(book =>(
      `
            <div class="swiper-slide">
              <div class="slider-card1">
                <img class="book-img" src="${book.imageUrl}"
                alt="${book.title}"/>
                <p class="book_title">${book.title}</p>
                <p class="book_subtitle">${book.author}</p>
                <button><a class = "readMoreText" href="./bookPage.html">Read more</a></button>
              </div>
            </div>
      `
      
    ))
   
    swiper.update();
  };

  let slidernewrelease = document.getElementById('swiper_all');

  function renderBooksa(list) {
  
  let fliter_books = list.filter((book)=>{
    let x = new Date(book.bookcreatetime)
    let currentime = new Date().getTime()
    let isnew = currentime - x 
    if(isnew < 432000000 ){
      return book;
    }
    
  })

  console.log("filter",fliter_books);
  

    console.log(list);


    slidernewrelease.innerHTML = fliter_books.map((book)=>{
      return `
      <div class="swiper-slide">
              <div class="slider-card1">
              <div class="newTag">NEW</div>
                <img class="book-img" src="${book.imageUrl}"
                alt="${book.title}"/>
                <p class="book_title">${book.title}</p>
                <p class="book_subtitle">${book.author}</p>
                <button><a class = "readMoreText" href="./bookPage.html">Read more</a></button>
              </div>
            </div>
      `
    })
    swiper2.update();
    
}



const swiper = new Swiper('.swiper.mySwiper', {
  slidesPerView: 5,
  direction: 'horizontal',
  loop: true,
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
  
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});




const swiper2 = new Swiper('.swiper.mySwiper2', {
  // Optional parameters
  slidesPerView: 5,
  direction: 'horizontal',
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      // when window width is >= 320px
      320: {
          slidesPerView: 1.5,
          spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
          slidesPerView: 3,
          spaceBetween: 20
      },
      1200: {
          slidesPerView: 5,
          spaceBetween: 20
      }
  }
});


