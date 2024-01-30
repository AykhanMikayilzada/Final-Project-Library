let joinclick = document.getElementById("joinclick");

let overlaybtn = document.getElementsByClassName("overlay")[0];

let overlaymodal = document.getElementById("overlaymodal");

let joinustext = document.getElementById("joinustext");

joinclick.onclick = function(){
    overlaymodal.style.display = "block";
    joinustext.style.display = "block";
    overlaymodal.style.opacity = "1";
    overlaymodal.style.animation = "fadeIn 0.3s"
    joinustext.style.animation = "fadeIn 0.3s"

}

overlaymodal.onclick = function(){
    overlaymodal.style.opacity = "0";
    overlaymodal.style.animation = "fadeOut 0.5s"
    joinustext.style.animation = "fadeOut 0.3s"

    setTimeout(function(){
        overlaymodal.style.display = "none";
        joinustext.style.display = "none";
        
    }, 300)
};





