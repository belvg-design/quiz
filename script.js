let start = document.querySelector("#start"),
    sectionStart = document.querySelector("#sectionStart"),
    sectionQuestion = document.querySelector("#sectionQuestion"),
    sectionEnd = document.querySelector("#sectionEnd"),
    langChanger = document.querySelector("#langChanger"),
    language = document.querySelector("#language");

const key = "https://formspree.io/mbjzwlpg";

let system,
    lang,
    questions,
    answers = [],
    companyName = null,
    current = 0;

fetch("system.json")
    .then(response => response.json())
    .then(json =>{
        system = json;
        if(localStorage && localStorage.getItem("lang")) lang = localStorage.getItem("lang");
        else lang = system.default;
        setLang(lang);
        compositeLangs(system.lang, lang);
        refreshLang();
        start.addEventListener("click",(e)=>{
            sectionStart.style.setProperty("animation", "1s 1 normal blink");
            sectionQuestion.style.setProperty("animation", "0.5s 1 normal blinkOut");
            setTimeout(()=>{
                sectionStart.style.setProperty("animation", "none");
                sectionQuestion.style.setProperty("animation", "none");
            }, 1000)
            setTimeout(()=>{
                sectionQuestion.style.setProperty("display", "flex");
                sectionStart.style.setProperty("display", "none");
                nextQuestion(current);
            }, 500)
        })
        forward.addEventListener("click", goForward);
        back.addEventListener("click", goBack);
        input.addEventListener("input", checkInput);
        company.addEventListener("input", checkInput);
        end.addEventListener("click", ()=>location.reload());
        langChanger.addEventListener("click", openLang);
        window.addEventListener("click", closeLang);
    });

function openLang(e){
    language.classList.remove("hidden");
    if(e.target == langChanger.firstElementChild || e.target == langChanger.children[1])
        e.stopPropagation();
}
function closeLang(e){
    language.classList.add("hidden");
}
function compositeLangs(langData, defaultLang){
    for(let key of Object.keys(langData)){
        let li = document.createElement("li");
        li.innerText = langData[key];
        li.addEventListener("click",(e)=>{
            language.querySelector(".current").classList.remove("current");
            setLang(key);
            refreshLang();
            nextQuestion(current);
            e.target.classList.add("current");
        })
        if(key == defaultLang) li.classList.add("current");
        language.appendChild(li);
    }
}

function setLang(lang){
    if(!system.lang[lang]) lang = system.default;
    questions = system[lang].questions;
    text = system[lang].text;
    if(localStorage) localStorage.setItem("lang",lang);
}
function refreshLang(){
    for(let s=0; s<text.length; s++){
        for(let p=0; p<text[s].length; p++){
            if(typeof(text[s][p]) == "string"){
                document.querySelector(`.s${s}p${p}`).innerText = text[s][p];
            }
        }
    }
}
function receive(){
    const formData = new FormData();
    let answer = { "company_name": company.value};
    for(let i=0; i<questions.length; i++){
        answer[i] = { 
            "question": questions[i].quest,
            "answer": answers[i]
        }
    }
    formData.append('json', JSON.stringify(answer));

    fetch(key, {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    body: formData
    })
    .then(response => response.json())
    .then(result => {
    console.log('Success:', result);
    })
    .catch(error => {
    console.error('Error:', error);
    });
}

function nextQuestion(number){
    questionNumber.children[1].innerText = ` ${number+1}/${questions.length}`;
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
        forward.innerText = text[1][5].hidden;
    }else{
        company.classList.add("none");
        companyLabel.classList.add("none");
        forward.innerText = text[1][3];
    }
    checkInput();

}
function goForward(e){
    if(!checkInput()) return;
    if((current + 1)==questions.length){
        receive();
        sectionQuestion.style.setProperty("animation", "1s 1 normal blink");
        sectionEnd.style.setProperty("animation", "0.5s 1 normal blinkOut");
        setTimeout(()=>{
            sectionQuestion.style.setProperty("animation", "none");
            sectionEnd.style.setProperty("animation", "none");
        }, 1000)
        setTimeout(()=>{
            sectionEnd.style.setProperty("display", "flex");
            sectionQuestion.style.setProperty("display", "none");
        }, 500)
        return;
    }
    sectionQuestion.style.setProperty("animation", "1s 1 normal blink");
    setTimeout(()=>{
        sectionQuestion.style.setProperty("animation", "none");
    }, 1000)
    setTimeout(()=>{
        answers[current] = input.value;
        current++;
        nextQuestion(current);
    }, 500)
}
function goBack(e){
    if(current==0){
        return;
    }
    sectionQuestion.style.setProperty("animation", "1s 1 normal blink");
    setTimeout(()=>{
        sectionQuestion.style.setProperty("animation", "none");
    }, 1000)
    setTimeout(()=>{
        answers[current] = input.value;
        current--;
        nextQuestion(current);
    }, 500)
}
function checkInput(e){
    if(input.value.trim() == "" ){
        forward.disabled = true;
        if(e)e.target.focus();
        else input.focus();
        return false;
    }
    if(current == questions.length-1 && company.value.trim() == ""){
        forward.disabled = true;
        if(e)e.target.focus();
        else company.focus();
        return false;
    }
    forward.disabled = false;
    return true;
}

for(let i of document.querySelectorAll("img"))i.setAttribute("draggable","false");