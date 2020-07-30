let start = document.querySelector("#start"),
    sectionStart = document.querySelector("#sectionStart"),
    sectionQuestion = document.querySelector("#sectionQuestion"),
    sectionEnd = document.querySelector("#sectionEnd");


start.addEventListener("click",(e)=>{
    sectionStart.style.setProperty("display", "none");
    sectionQuestion.style.setProperty("display", "flex");
})