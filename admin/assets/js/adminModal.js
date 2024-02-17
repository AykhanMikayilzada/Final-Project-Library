let modalbtnimg = document.getElementById("modalbtnimg");
let modalselectBtn = document.getElementById("modalselectBtn");
let overlaymodal = document.getElementById("overlaymodal");
let joinustext = document.getElementById("joinustext");


modalbtnimg.onclick = function(){
    overlaymodal.style.display = "block";
    joinustext.style.display = "block";
    overlaymodal.style.opacity = "1";
    overlaymodal.style.animation = "fadeIn 0.3s";
    joinustext.style.animation = "fadeIn 0.3s";

}

overlaymodal.onclick = function(){
    overlaymodal.style.opacity = "0";
    overlaymodal.style.animation = "fadeOut 0.3s"
    joinustext.style.animation = "fadeOut 0.3s"

    setTimeout(function(){
        overlaymodal.style.display = "none";
        joinustext.style.display = "none";
        
    }, 100)
};



modalselectBtn.onclick = function(){
    overlaymodal.style.opacity = "0";
    overlaymodal.style.animation = "fadeOut 0.3s";
    joinustext.style.animation = "fadeOut 0.1s";

    setTimeout(function(){
        overlaymodal.style.display = "none";
        joinustext.style.display = "none";
        
    }, 100)
};
