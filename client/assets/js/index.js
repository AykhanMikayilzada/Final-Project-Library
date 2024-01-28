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


let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const personInfo = document.getElementById('personInfo');
    const container1 = document.querySelector('.container1');
    const container2 = document.querySelector('.container2');

    

    if (isDarkMode) {
        body.classList.add('dark-mode');
        setTimeout(()=>{
            personInfo.classList.add('dark-mode');
            container1.classList.add('dark-mode');
            container2.classList.add('dark-mode');
        }, 10)
    } else {
        body.classList.remove('dark-mode');
        personInfo.classList.remove('dark-mode');
        container1.classList.remove('dark-mode');
        container2.classList.remove('dark-mode');
    }
}