let start = document.querySelector("#start"),
    sectionStart = document.querySelector("#sectionStart"),
    sectionQuestion = document.querySelector("#sectionQuestion"),
    sectionEnd = document.querySelector("#sectionEnd");


start.addEventListener("click",(e)=>{
    sectionStart.style.setProperty("display", "none");
    sectionQuestion.style.setProperty("display", "flex");
})

forward.addEventListener("click",(e)=>{
    sectionQuestion.style.setProperty("display", "none");
    sectionEnd.style.setProperty("display", "flex");
})