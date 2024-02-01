let joinclickres = document.getElementById("joinclickres");
let joinustextres = document.getElementById("joinustextres");
let xbtnres = document.getElementById("xbtnres");

// -----
let hamburgerbtn = document.getElementById("hamburgerbtn");
let overlayrespons = document.getElementById("overlayrespons");
let xbtn = document.getElementById("xbtn");
let responstag = document.getElementById("responstag");
let responss = document.getElementById("responss");

hamburgerbtn.onclick = function(){
    overlayrespons.style.display = "block";
    hamburgerbtn.style.display = "none";
    xbtn.style.display = "block"
    responstag.style.display = "block";
    overlayrespons.style.opacity = "1";
    overlayrespons.style.animation = "fadeIn 0.3s"
    responstag.style.animation = "fadeIn 0.3s"
    responss.style.display = "block"
    xbtn.style.animation = "fadeIn 0.3s"

}

xbtn.onclick = function(){
    hamburgerbtn.style.display = "block";
    responstag.style.animation = "fadeOut 0.3s";
    overlayrespons.style.opacity = "0";
    overlayrespons.style.animation = "fadeOut 0.5s";
    xbtn.style.animation = "fadeOut 0.3s"


    setTimeout(function(){
        overlayrespons.style.display = "none";
        responstag.style.display = "none"
        xbtn.style.display = "none"
    },300);

    joinclickresFunction();
 

};

console.log(hamburgerbtn);



// ---------- join us responsive


joinclickres.onclick = function(){
    overlayrespons.style.display = "block";
    overlayrespons.style.opacity = "1";
    overlayrespons.style.animation = "fadeIn 0.4s"
    hamburgerbtn.style.display = "none";
    xbtnres.style.display = "block"
    xbtnres.style.animation = "fadeIn 0.3s"
    joinustextres.style.display = "block";
    joinustextres.style.animation = "fadeIn 0.4s";

};


xbtnres.onclick = function(){
    overlayrespons.style.opacity = "0";
    overlayrespons.style.animation = "fadeOut 0.5s"
    joinustextres.style.animation = "fadeOut 0.3s"
    xbtnres.style.animation = "fadeOut 0.3s"
    hamburgerbtn.style.display = "block";
    xbtnres.style.display = "none"
    xbtnres.style.display = "none"
    setTimeout(function(){
    overlayrespons.style.display = "none";
    joinustextres.style.display = "none";
    }, 300)
};

// -----------


