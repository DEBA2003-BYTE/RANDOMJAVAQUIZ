var scores = document.getElementById('score');
var clock = document.getElementById('timer');
var userScore = document.getElementById('user-score');
var leaderboard = document.getElementById('leaderboard');
var clearScores = document.getElementById('clear');
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
var playAgain = document.getElementById('play-again');
var leaderBoardList = document.getElementById('leaders');
var leaderBoardButton = document.getElementById('high-scores');
var currentQuestionIndex;
var sec = 60;
var score = 0;


startButton.addEventListener('click', startGame);

function shuffleArray(passedArray) {
    for (var i = 0; i < passedArray.length; i++) {
        var rand = Math.floor(Math.random() * passedArray.length);
        var temp = passedArray[i];
        passedArray[i] = passedArray[rand];
        passedArray[rand] = temp;
    }
    return passedArray;
}


function timer() {
    var timer = setInterval(function () {
        document.getElementById('timer').textContent = 'Time: ' + sec;
        if (sec <= 0) {
            clearInterval(timer);
            endQuiz()
        }
        sec--;
    }, 1000);
}


var shuffled = [];


function startGame() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide');
    leaderBoardButton.classList.add('hide');
    shuffled = shuffleArray(questionArray);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestion(shuffled);
}


function initializeQuestion(shuffledQuestions) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


function clearoptions() {
    answerButtonsEl.innerHTML = "";
}


function showQuestion(currentQuestionObject) {
    questionEl.textContent = currentQuestionObject.title;
    clearoptions();
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[0].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[0].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[1].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[1].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[2].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[2].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[3].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[3].correct);
    })
}


function selectAnswer(isCorrect) {
    if (isCorrect == true) {
        score += 10;
        alert('Correct');
    } else {
        sec -= 10;
        alert('Incorrect! Time Deducted');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == shuffled.length) {
        alert("That's All the Questions! Lets see how you did");
        endQuiz();
    } else {
        showQuestion(shuffled[currentQuestionIndex]);
    }
}


function endQuiz() {
    sec = 0;
    questionContainerEl.classList.add('hide');
    scores.classList.remove('hide');
    leaderBoardButton.classList.remove('hide');
    userScore.textContent = 'Your total was ' + score + ' out of 70!';
}

var initialsToAdd = "";
var highRollersClub = [];

submit.addEventListener('click', function (event) {
    event.preventDefault();
    showLeaderboard();
})

function addScores(initials, score) {
    var newScore = {
        initials: initials,
        score: score
    }
    highRollersClub.push(newScore);
    localStorage.setItem('highRollersClub', JSON.stringify(highRollersClub));
}

function startAgain() {
    sec = 60;
    score = 0;
    leaderboard.classList.add('hide');
    startGame();
}


playAgain.addEventListener('click', function () {
    startAgain();
})


function clearLeaderboard() {
    localStorage.clear();
    leaderBoardList.innerHTML = "";
}
clearScores.addEventListener('click',clearLeaderboard)
    



function showLeaderboard() {
    initialsToAdd = userInitials.value;
    addScores(initialsToAdd, score);
    scores.classList.add('hide');
    leaderboard.classList.remove('hide');
    leaderBoardList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("highRollersClub"));
    for (i = 0; i < displayScores.length; i++) {
        var newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfLeaders");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        leaderBoardList.append(newLeader);
    }
}

leaderBoardButton.addEventListener('click', function () {
    startButton.classList.add('hide');
    description.classList.add('hide');
    questionContainerEl.classList.add('hide');
    scores.classList.add('hide');
    showLeaderboard();
});
console.log(highRollersClub)
console.log(scores)

var questionArray = [
{
    title: 'What is the keyword used to create a class in Java?',
    options: [
        { text: 'class', correct: true },
        { text: 'object', correct: false },
        { text: 'struct', correct: false },
        { text: 'define', correct: false }
    ]
},
{
    title: 'Which of the following is a valid data type in Java?',
    options: [
        { text: 'integer', correct: false },
        { text: 'int', correct: true },
        { text: 'num', correct: false },
        { text: 'float64', correct: false }
    ]
},
{
    title: 'What is the default value of a boolean variable in Java?',
    options: [
        { text: 'true', correct: false },
        { text: 'false', correct: true },
        { text: '0', correct: false },
        { text: 'null', correct: false }
    ]
},
{
    title: 'Which method is the entry point of a Java application?',
    options: [
        { text: 'start()', correct: false },
        { text: 'main()', correct: true },
        { text: 'run()', correct: false },
        { text: 'init()', correct: false }
    ]
},
{
    title: 'What is the purpose of the "static" keyword in Java?',
    options: [
        { text: 'To define a method that can be called on an instance', correct: false },
        { text: 'To define a method that belongs to the class, not instances', correct: true },
        { text: 'To define a variable with a fixed value', correct: false },
        { text: 'To define a constant', correct: false }
    ]
},
{
    title: 'Which of the following is used to handle exceptions in Java?',
    options: [
        { text: 'try-catch', correct: true },
        { text: 'if-else', correct: false },
        { text: 'for-loop', correct: false },
        { text: 'switch-case', correct: false }
    ]
},
{
    title: 'What does JVM stand for?',
    options: [
        { text: 'Java Variable Manager', correct: false },
        { text: 'Java Virtual Machine', correct: true },
        { text: 'Java Version Method', correct: false },
        { text: 'Java Verified Module', correct: false }
    ]
}
    
  ];