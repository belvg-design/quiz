let start = document.querySelector("#start"),
    sectionStart = document.querySelector("#sectionStart"),
    sectionQuestion = document.querySelector("#sectionQuestion"),
    sectionEnd = document.querySelector("#sectionEnd");

let questions,
    answers = [],
    current = 0;

fetch("question.json")
    .then(response => response.json())
    .then(json =>{
        questions = json;
        start.addEventListener("click",(e)=>{
            sectionStart.style.setProperty("display", "none");
            sectionQuestion.style.setProperty("display", "flex");
            nextQuestion(current);
            forward.addEventListener("click", goForward);
            back.addEventListener("click", goBack);
            input.addEventListener("input", checkInput)
        })
    });

function nextQuestion(number){
    questionNumber.innerText = `Question ${number+1}/${questions.length}`;
    question.innerText = questions[number].quest;
    description.innerText = questions[number].descr;
    input.value = answers[number]?answers[number]: "";
}
function goForward(e){
    if(!checkInput({target:input});
    if((current + 1)==questions.length){
        sectionQuestion.style.setProperty("display", "none");
        sectionEnd.style.setProperty("display", "flex");
        return;
    }
    answers[current] = input.value;
    current++;
    nextQuestion(current);
}
function goBack(e){
    if(!checkInput({target:input}) || current==0){
        return;
    }
    answers[current] = input.value;
    current--;
    nextQuestion(current);
}
function checkInput(e){
    if(input.value.trim() == ""){
        back.disabled = true;
        forward.disabled = true;
        return false;
    }else{
        back.disabled = false;
        forward.disabled = false;
        return true;
    }
    console.log("input", `"${input.value.trim()}"`,input.value.trim()=="");
}


//Effects
/*
sectionQuestion.style.setProperty("animation", "1s 1 normal blink");
setTimeout(()=>{
    sectionQuestion.style.setProperty("animation", "none");
}, 1000)
setTimeout(()=>{
}, 500)
*/