const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Transfer Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which CSS property changes the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: 1
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "variable",
            "int",
            "let",
            "define"
        ],
        answer: 2
    },

    {
        question: "Which method writes content to the browser console?",
        options: [
            "console.print()",
            "console.write()",
            "console.log()",
            "print()"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag inserts an image?",
        options: [
            "<picture>",
            "<image>",
            "<img>",
            "<src>"
        ],
        answer: 2
    },

    {
        question: "Which CSS property makes corners rounded?",
        options: [
            "border-style",
            "radius",
            "border-radius",
            "corner-radius"
        ],
        answer: 2
    },

    {
        question: "JavaScript is a ______ language.",
        options: [
            "Programming",
            "Markup",
            "Database",
            "Styling"
        ],
        answer: 0
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>"
        ],
        answer: 2
    }
];

// Elements
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const questionNo = document.getElementById("questionNo");
const totalQuestion = document.getElementById("totalQuestion");
const result = document.querySelector(".result");
const finalScore = document.getElementById("finalScore");
const totalScore = document.getElementById("totalScore");
const restartBtn = document.getElementById("restartBtn");

let currentQuestion = 0;
let score = 0;

totalQuestion.textContent = questions.length;
totalScore.textContent = questions.length;

loadQuestion();

function loadQuestion() {

    resetState();

    let current = questions[currentQuestion];

    question.textContent = current.question;

    questionNo.textContent = currentQuestion + 1;

    options.forEach((btn, index) => {
        btn.textContent = current.options[index];
        btn.onclick = () => checkAnswer(index);
    });

}

function checkAnswer(index) {

    const correct = questions[currentQuestion].answer;

    options.forEach(btn => btn.disabled = true);

    if (index === correct) {

        options[index].classList.add("correct");

        score++;

        scoreElement.textContent = score;

    } else {

        options[index].classList.add("wrong");

        options[correct].classList.add("correct");

    }

    nextBtn.style.display = "block";

}

function resetState() {

    nextBtn.style.display = "none";

    options.forEach(btn => {

        btn.disabled = false;

        btn.classList.remove("correct", "wrong");

    });

}

nextBtn.onclick = () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

};

function showResult() {

    document.querySelector(".container").style.display = "none";

    result.classList.remove("hide");

    finalScore.textContent = score;

}

restartBtn.onclick = () => {

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent = 0;

    result.classList.add("hide");

    document.querySelector(".container").style.display = "block";

    loadQuestion();

};