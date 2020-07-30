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
            company.addEventListener("input", checkInput)
        })
    });

function nextQuestion(number){
    questionNumber.innerText = `Question ${number+1}/${questions.length}`;
    question.innerText = questions[number].quest;
    description.innerText = questions[number].descr;
    input.value = answers[number]?answers[number]: "";
    if(number == 0){
        back.classList.add("hidden");
    }else 
        back.classList.remove("hidden");
    if(number == questions.length-1){
        company.classList.remove("none");
        companyLabel.classList.remove("none");
        forward.innerText = "Submit";
    }else{
        company.classList.add("none");
        companyLabel.classList.add("none");
        forward.innerText = "Next Question";
    }
    input.focus();

}
function goForward(e){
    if(!checkInput()) return;
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
    if(current==0){
        return;
    }
    answers[current] = input.value;
    current--;
    nextQuestion(current);
}
function checkInput(e){
    if(input.value.trim() == "" ){
        back.disabled = true;
        forward.disabled = true;
        if(e)e.target.focus();
        else input.focus();
        return false;
    }
    if(current == questions.length-1 && company.value.trim() == ""){
        back.disabled = true;
        forward.disabled = true;
        if(e)e.target.focus();
        else input.focus();
        return false;
    }
    back.disabled = false;
    forward.disabled = false;
    return true;
    //console.log("input", `"${input.value.trim()}"`,input.value.trim()=="");
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