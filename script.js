let start = document.querySelector("#start"),
    sectionStart = document.querySelector("#sectionStart"),
    sectionQuestion = document.querySelector("#sectionQuestion"),
    sectionEnd = document.querySelector("#sectionEnd");

let questions,
    answers = [];

fetch("questions.json")
    .then(response => response.json())
    .then(json =>{
        questions = json;
        start.addEventListener("click",(e)=>{
            sectionStart.style.setProperty("display", "none");
            sectionQuestion.style.setProperty("display", "flex");
        })
    });

nextQuestion(number){
    questionNumber.innerText = `Question ${number+1}/${questions.length}`;
    question.innerText = questions[number].quest;
    description.innerText = questions[number].descr;
    input = answers[number]?answers[number]
}

forward.addEventListener("click",(e)=>{
    sectionQuestion.style.setProperty("display", "none");
    sectionEnd.style.setProperty("display", "flex");
})