// ==========================================
// Quiz Master App - Part 1
// ==========================================

// ---------- Questions ----------

const questions = [
{
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: 0
},
{
    question: "Which CSS property changes text color?",
    options: ["font-color", "color", "text-style", "background"],
    answer: 1
},
{
    question: "Which language is used to make websites interactive?",
    options: ["HTML", "CSS", "Java", "JavaScript"],
    answer: 3
},
{
    question: "Which HTML tag inserts an image?",
    options: ["<picture>", "<image>", "<img>", "<src>"],
    answer: 2
},
{
    question: "Which CSS property makes an element flexible?",
    options: ["display:flex", "position:flex", "flex-box", "display:block"],
    answer: 0
},
{
    question: "Which symbol is used for ID selector in CSS?",
    options: [".", "#", "*", "&"],
    answer: 1
},
{
    question: "Which JavaScript keyword declares a constant?",
    options: ["let", "var", "const", "define"],
    answer: 2
},
{
    question: "Which HTML tag creates a button?",
    options: ["<button>", "<input>", "<click>", "<btn>"],
    answer: 0
},
{
    question: "Which CSS property adds shadow to a box?",
    options: ["shadow", "box-shadow", "text-shadow", "border-shadow"],
    answer: 1
},
{
    question: "Which method selects an element by ID?",
    options: [
        "querySelectorAll()",
        "getElementById()",
        "getElementsByClass()",
        "selectElement()"
    ],
    answer: 1
}
];

// ---------- DOM Elements ----------

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const playerName = document.getElementById("playerName");
const playerDisplay = document.getElementById("playerDisplay");

const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("question");

const optionButtons = document.querySelectorAll(".option-btn");

const timerElement = document.getElementById("timer");

const progressBar = document.getElementById("progressBar");

const startBtn = document.getElementById("startQuiz");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const resultName = document.getElementById("resultName");
const scoreElement = document.getElementById("score");
const correctElement = document.getElementById("correctCount");
const wrongElement = document.getElementById("wrongCount");
const highScoreElement = document.getElementById("highScore");

const restartBtn = document.getElementById("restartQuiz");
const homeBtn = document.getElementById("goHome");

const themeBtn = document.getElementById("themeBtn");

// ---------- Variables ----------

let currentQuestion = 0;
let score = 0;

let selectedAnswer = null;

let timer = 20;
let timerInterval;

// ==========================================
// Start Quiz
// ==========================================

startBtn.addEventListener("click", () => {

    if(playerName.value.trim()===""){

        alert("Please enter your name.");

        return;

    }

    welcomeScreen.classList.remove("active");

    quizScreen.classList.add("active");

    playerDisplay.textContent = "Player : " + playerName.value;

    loadQuestion();

});

// ==========================================
// Load Question
// ==========================================

function loadQuestion(){

    clearInterval(timerInterval);

    timer = 20;

    startTimer();

    selectedAnswer = null;

    let q = questions[currentQuestion];

    questionCounter.innerHTML =
        `Question ${currentQuestion+1} / ${questions.length}`;

    questionText.innerHTML = q.question;

    optionButtons.forEach((button,index)=>{

        button.innerHTML = q.options[index];

        button.disabled = false;

        button.classList.remove("correct");

        button.classList.remove("wrong");

    });

    progressBar.style.width =
        ((currentQuestion)/questions.length)*100 + "%";

}

// ==========================================
// Timer
// ==========================================

function startTimer(){

    timerElement.innerHTML = timer;

    timerInterval = setInterval(()=>{

        timer--;

        timerElement.innerHTML = timer;

        if(timer<=0){

            clearInterval(timerInterval);

            nextQuestion();

        }

    },1000);

}

// ==========================================
// Option Click
// ==========================================

optionButtons.forEach((button,index)=>{

button.addEventListener("click",()=>{

    if(selectedAnswer!==null){

        return;

    }

    selectedAnswer=index;

    let correct=questions[currentQuestion].answer;

    if(index===correct){

        button.classList.add("correct");

        score++;

    }

    else{

        button.classList.add("wrong");

        optionButtons[correct].classList.add("correct");

    }

    optionButtons.forEach(btn=>{

        btn.disabled=true;

    });

});

});
// ==========================================
// Quiz Master App - Part 2
// ==========================================

// ---------- Next Button ----------

nextBtn.addEventListener("click", () => {
    nextQuestion();
});

// ---------- Previous Button ----------

prevBtn.addEventListener("click", () => {

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

});

// ==========================================
// Next Question Function
// ==========================================

function nextQuestion(){

    clearInterval(timerInterval);

    currentQuestion++;

    if(currentQuestion >= questions.length){

        showResult();

        return;

    }

    loadQuestion();

}

// ==========================================
// Show Result
// ==========================================

function showResult(){

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    resultName.innerHTML = playerName.value;

    scoreElement.innerHTML = score + " / " + questions.length;

    correctElement.innerHTML = score;

    wrongElement.innerHTML = questions.length - score;

    // ---------- High Score ----------

    let highScore = localStorage.getItem("quizHighScore");

    if(highScore === null){

        highScore = 0;

    }

    if(score > highScore){

        highScore = score;

        localStorage.setItem("quizHighScore", score);

    }

    highScoreElement.innerHTML = highScore;

    progressBar.style.width = "100%";

}

// ==========================================
// Restart Quiz
// ==========================================

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    resultScreen.classList.remove("active");

    quizScreen.classList.add("active");

    loadQuestion();

});

// ==========================================
// Home Button
// ==========================================

homeBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    clearInterval(timerInterval);

    resultScreen.classList.remove("active");

    quizScreen.classList.remove("active");

    welcomeScreen.classList.add("active");

});

// ==========================================
// Dark Mode Toggle
// ==========================================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

});

// ---------- Load Saved Theme ----------

window.addEventListener("load", () => {

    let savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark");

    }

});

// ==========================================
// Disable Previous Button on First Question
// ==========================================

setInterval(() => {

    prevBtn.disabled = currentQuestion === 0;

}, 100);

// ==========================================
// Keyboard Shortcuts
// Press 1,2,3,4 to Select Options
// ==========================================

document.addEventListener("keydown", (e) => {

    if(!quizScreen.classList.contains("active")) return;

    if(e.key === "1") optionButtons[0].click();

    if(e.key === "2") optionButtons[1].click();

    if(e.key === "3") optionButtons[2].click();

    if(e.key === "4") optionButtons[3].click();

});

// ==========================================
// End of Script
// ==========================================