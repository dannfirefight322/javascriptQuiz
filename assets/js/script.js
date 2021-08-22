//Getting handle of elements on intitial html page
var sQDiv = document.getElementById("sPage");
var sQButton = document.getElementById("sBtn");
var qBody = document.getElementById("quiz");
var qTimer = document.getElementById("timer");
var questionsEl = document.getElementById("question");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var resultsEl = document.getElementById("result");
var gODiv = document.getElementById("gO");
var finalScoreEl = document.getElementById("finalScore");
var highscoreInputName = document.getElementById("initials");
var submitScoreBtn = document.getElementById("sScore");
var highscoreContainer = document.getElementById("hSContainer");
var highscoreDiv = document.getElementById("hSPage");
var highscoreName = document.getElementById("hSInitials");
var highscore = document.getElementById("hScore");
var endGameBtns = document.getElementById("finalBtns");
//Questions
var quizQuestions = [{
    question: "What does JS stand for in coding?",
    choiceA: "Just stand",
    choiceB: "JavaScript",
    choiceC: "Jam session",
    choiceD: "Jury summons",
    correctAnswer: "b"},
    {
    question: "What is CSS used for?",
    choiceA: "Adds function to the page",
    choiceB: "Adds styling to the page",
    choiceC: "Lets users interact with the page",
    choiceD: "Nothing at all.",
    correctAnswer: "b"},
    {
    question: "How can you make a website viewable on mulitple resolutions?",
    choiceA: "With positioning",
    choiceB: "By using just HTML",
    choiceC: "Asking the page nicely",
    choiceD: "By using @media query",
    correctAnswer: "d"},
    {
    question: "What is the 'this statment' keyword definition in JavaScript?",
    choiceA: "Idenify a specific person for thing",
    choiceB: "Asks what someing is specificly",
    choiceC: "Refers to the object from which the function was called",
    choiceD: "Has no definition in JavaScript",
    correctAnswer: "c"},
    {
    question: "What type of casing is most common in JavaScript?",
    choiceA: "Pascal casing",
    choiceB: "Camal casing",
    choiceC: "Snake casing",
    choiceD: "It doesn't really matter, its all the same",
    correctAnswer: "b"},  
    {
    question: "What happens when you declare a function",
    choiceA: "Creates a function definition",
    choiceB: "Asks a user to do something",
    choiceC: "Nothing",
    choiceD: "You dont know till you make a function",
    correctAnswer: "a"},
    ];
    var finalQuestionIndex = quizQuestions.length;
    var currentQuestionIndex = 0;
    var timeLeft = 30;
    var timerInterval;
    var score = 0;
    var correct;
    // goes through qustions
function generateQuizQuestion(){
    gODiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};
// This starts the quiz
function startQuiz(){
    gODiv.style.display = "none";
    sQDiv.style.display = "none";
    generateQuizQuestion();
//Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        qTimer.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    qBody.style.display = "block";
}
// starts the quiz!
sQButton.addEventListener("click",startQuiz);
//  score display
function showScore(){
    qBody.style.display = "none"
    gODiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}
//saves score and initials 
submitScoreBtn.addEventListener("click", function highscore(){
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
        gODiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});
// clears scores from storage
function generateHighscores(){
    highscoreName.innerHTML = "";
    highscore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreName.appendChild(newNameSpan);
        highscore.appendChild(newScoreSpan);
    }
}
// display for scores
function showHighscore(){
    sQDiv.style.display = "none"
    gODiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
}
// clears storage
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}
// resets quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gODiv.style.display = "none";
    sQDiv.style.display = "flex";
    timeLeft = 30;
    score = 0;
    currentQuestionIndex = 0;
}
// checking ofr correct answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}
