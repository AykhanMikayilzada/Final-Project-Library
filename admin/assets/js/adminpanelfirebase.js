
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyBBDUmstwc_hZjzqQG7yDn4pIU-w-b9FDU",
//     authDomain: "libraryprojectapp-df468.firebaseapp.com",
//     projectId: "libraryprojectapp-df468",
//     storageBucket: "libraryprojectapp-df468.appspot.com",
//     messagingSenderId: "176480815398",
//     appId: "1:176480815398:web:47ee903956a99357d299e7",
//     measurementId: "G-2H2B66PT8G"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);


//   import { initializeApp } from 'firebase/app';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   //...
// };



// const app = initializeApp(firebaseConfig);

  // console.log("app:", app, analytics);




// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  // const analytics = getAnalytics(app);
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  // const createData = (path, data) => {
  //   const newRef = push(ref(database, path), data);
  //   return newRef.key;
  // };

//   function createData(path, data) {
//    
//     const timestamp = new Date().getTime();
//  
//     data.timestamp = timestamp;
//     const newRef = push(ref(database, path), data);
//     return newRef.key;
// }



// const swiper = new Swiper('.swiper.mySwiper', {
//   slidesPerView: 5,
//   direction: 'horizontal',
//   loop: true,
//   navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//       // when window width is >= 320px
//       320: {
//           slidesPerView: 1.5,
//           spaceBetween: 20
//       },
  
//       480: {
//           slidesPerView: 2,
//           spaceBetween: 20
//       },
//       767: {
//           slidesPerView: 3,
//           spaceBetween: 20
//       },
//       1200: {
//           slidesPerView: 5,
//           spaceBetween: 20
//       }
//   }
// });




// const swiper2 = new Swiper('.swiper.mySwiper2', {
//   // Optional parameters
//   slidesPerView: 5,
//   direction: 'horizontal',
//   loop: true,
//   // Navigation arrows
//   navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//       // when window width is >= 320px
//       320: {
//           slidesPerView: 1.5,
//           spaceBetween: 20
//       },
//       // when window width is >= 480px
//       480: {
//           slidesPerView: 2,
//           spaceBetween: 20
//       },
//       // when window width is >= 640px
//       767: {
//           slidesPerView: 3,
//           spaceBetween: 20
//       },
//       1200: {
//           slidesPerView: 5,
//           spaceBetween: 20
//       }
//   }
// });

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
    // const newBooksContainer = document.createElement('div');
    // newBooksContainer.classList.add('new-books-container');


    // const currentTime = new Date().getTime();
    // let tenSecondsAgo = currentTime - 432000000;

  
  let fliter_books = list.filter((book)=>{
    let x = new Date(book.bookcreatetime)
    let currentime = new Date().getTime()
    let isnew = currentime - x 
    if(isnew < 432000000 ){
      return book;
    }
    
  })

  console.log("filter",fliter_books);
  

    // const newBooks = list.filter(book => book.timestamp >= tenSecondsAgo);

    // newBooks.forEach(book => {
    //     const bookCard = document.createElement('div');
    //     bookCard.classList.add('swiper-slide'); 
       
    //     bookCard.innerHTML = `
    //     <div class="slider-card1">
    //         <div class="newTag">NEW</div>
    //         <img class="book-img" src="${book.imageUrl}"
    //         alt="${book.title}"/>
    //         <p class="book_title">${book.title}</p>
    //         <p class="book_subtitle">${book.author}</p>
    //         <button>Read more</button>
    //     </div>
    //     `;
        
    //     newBooksContainer.appendChild(bookCard);
    // });


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
    // slidernewrelease.innerHTML = '';
    // slidernewrelease.appendChild(newBooksContainer);
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


//   function renderBooksa(list) {
//     const newBooksContainer = document.createElement('div');
//     newBooksContainer.classList.add('new-books-container');

//     const currentTime = new Date().getTime();
//     const tenSecondsAgo = currentTime - 10000; // 10 saniye öncesi

//     // Yeni eklenen kitapları bul
//     const newBooks = list.filter(book => book.timestamp >= tenSecondsAgo);

//     newBooks.forEach(book => {
//         const bookCard = document.createElement('div');
//         bookCard.classList.add('slider-card1');
//         bookCard.innerHTML = `
//             <img class="book-img" src="${book.imageUrl}" 
//             alt="${book.title}" />
//             <p class="book_title">${book.title}</p>
//             <p class="book_subtitle">${book.author}</p>
//             <button>Read more</button>
//         `;
        
//         newBooksContainer.appendChild(bookCard);
//     });

//     const slidernewrelease = document.getElementById('slidernewrelease');
//     slidernewrelease.innerHTML = '';
//     slidernewrelease.appendChild(newBooksContainer);

//     // Eklenen kitapları güncelle
//     addedBooks = addedBooks.concat(newBooks);

//     // 10 saniye sonra eklenen kitapları temizle
//     setTimeout(() => {
//         addedBooks = addedBooks.filter(book => book.timestamp >= tenSecondsAgo);
//         renderBooksa(addedBooks);
//     }, 432000000); // 10 saniye (10000 milisaniye)
// }





//   function renderBooksa(list) {
//     const newBooksContainer = document.createElement('div');
//     newBooksContainer.classList.add('new-books-container');

//     list.forEach(book => {
//         const bookCard = document.createElement('div');
//         bookCard.classList.add('slider-card1');
//         bookCard.innerHTML = `
//             <img class="book-img" src="${book.imageUrl}" 
//             alt="${book.title}" />
//             <p class="book_title">${book.title}</p>
//             <p class="book_subtitle">${book.author}</p>
//             <button>Read more</button>
//         `
        
//         newBooksContainer.appendChild(bookCard);
//     });

//     const slidernewrelease = document.getElementById('slidernewrelease');
//     slidernewrelease.innerHTML = '';
//     slidernewrelease.appendChild(newBooksContainer);
// };

      






// {
//   "rules": {
//     ".read":  true,  // 2024-3-9
//     ".write": true,  // 2024-3-9
//   }
// }