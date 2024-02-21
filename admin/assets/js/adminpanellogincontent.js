let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

let MsgHead = document.getElementById("msg");
let GreetHead = document.getElementById("greet");
let SignoutBtn = document.getElementById("signoutbutton");
let signoutbuttonres = document.getElementById("signoutbuttonres");



let Signout = ()=>{
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login1.html'
}

let CheckCred = ()=>{
    if (!sessionStorage.getItem("user-creds"))
    window.location.href = "login1.html"

    else {
        MsgHead.innerHTML = `user with email "${UserCreds.email}" logged`;
GreetHead.innerHTML = `welcome ${UserInfo.firstname + "" + UserInfo.lastname}`;
    }
}

window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);
signoutbuttonres.addEventListener('click', Signout)

