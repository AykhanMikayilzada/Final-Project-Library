async function GET() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "https://blog-api-t6u0.onrender.com/posts",
      options
    ); 
    const data = await response.json(); 
    return data;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function GETbyID(id) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://blog-api-t6u0.onrender.com/posts/${id}`,
      options
    ); 
    const data = await response.json(); 
    return data;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function POST(form) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    const response = await fetch(
      `https://blog-api-t6u0.onrender.com/posts`,
      options
    ); 
    const data = await response.json(); 
    return data;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function PUT(id, form) {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    const response = await fetch(
      `https://blog-api-t6u0.onrender.com/posts/${id}`,
      options
    ); 
    const data = await response.json(); 
    return data;
  } catch (err) {
    console.log("ERROR:", err);
  }
}

async function DELETE(id) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://blog-api-t6u0.onrender.com/posts/${id}`,
      options
    ); 
    const data = await response.json(); 
    return data;
  } catch (err) {
    console.log("ERROR:", err);
  }
}
const anonimComment = document.querySelector(".anonimComment");
const sendBtn = document.querySelector(".sendBtn");
const comments = document.querySelector(".comments");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.innerHTML = storedComments.join("");
  } catch (error) {
    console.log("Error:", error);
  }
});

sendBtn.addEventListener("click", async () => {
  if (anonimComment.value == "") {
    return;
  } else {
    try {
      const postData = { title: anonimComment.value, body: "Impsum" };
      const response = await POST(postData);
      const newComment = response.title;

      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const currentDay = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const newCommentHtml = `
          <div class="commentArea">
            <div class="nameAndDate">
              <span>anonim</span>
              <span>${currentHour}:${currentMinute} ${currentDay}</span>
              <p class="comment">${newComment}</p>
            </div>
          </div>`;

      comments.innerHTML += newCommentHtml;

      const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
      storedComments.push(newCommentHtml);
      localStorage.setItem("comments", JSON.stringify(storedComments));

      anonimComment.value = "";
    } catch (error) {
      console.log("Error:", error);
    }
  }
});

anonimComment.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    await addComment();
  }
});

async function addComment() {
  if (anonimComment.value == "") {
    return;
  } else {
    try {
      const postData = { title: anonimComment.value, body: "Impsum" };
      const response = await POST(postData);
      const newComment = response.title; //

      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const currentDay = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const newCommentHtml = `
          <div class="commentArea">
            <div class="nameAndDate">
              <span>anonim</span>
              <span>${currentHour}:${currentMinute} ${currentDay}</span>
              <p class="comment">${newComment}</p>
            </div>
          </div>`;

      comments.innerHTML += newCommentHtml;

      const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
      storedComments.push(newCommentHtml);
      localStorage.setItem("comments", JSON.stringify(storedComments));

      anonimComment.value = "";
    } catch (error) {
      console.log("Error:", error);
    }
  }
}
function clearComments() {
  comments.innerHTML = ""; 
  localStorage.removeItem("comments"); 
}

const clearCommentsButton = document.querySelector("#clearCommentsButton");
clearCommentsButton.addEventListener("click", clearComments);

sendBtn.addEventListener("click", addComment);


const getItemm = localStorage.getItem("bookId")

console.log(getItemm);





