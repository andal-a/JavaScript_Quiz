//Quiz questions, multiple choice answers, and correct answer
var questions = [{

    title: "Inside which HTML element do we place the JavaScript?",
    choices: ["the javasript tag", "the script tag", "the body tag", "the header tag"],
    answer: "the script tag"
},
{
    title: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    choices: ["last( )", "put( )", "push( )", "pop( )"],
    answer: "push( )"
},
{
    title: "What does Math.random() return?",
    choices: ["Numbers", "a number between 1 and 100", "a number between 0 and 99", "A number between 0 and 1"],
    answer: "A number between 0 and 1"
},
{
    title: "Which of the following function of an array object adds and/or removes elements from an array?",
    choices: ["toSource( )", "sort( )", "unshift( )", "splice( )"],
    answer: "splice( )"
},
{
    title: "Which element would you use to find an ID element?",
    choices: ["GETELEMENTbyid()", "getsElementsID()", "getElementById()", "findElementById()"],
    answer: "getElementById()"
}
];

//Sets numerical variables for funtions, scores, and timer
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Counter Starts when user selects "Start"
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //Ends game when timer is below 0
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//End game and stop timer
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//Stores scores in local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//When "clear score" selected, score name and value are cleared from local storage
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//Reset Game
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//When answer is incorrect, deduct 10 seconds from timer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;//

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}