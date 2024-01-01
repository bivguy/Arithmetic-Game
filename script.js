let totalTime = 10;
let score = 0;
window.onload = startGame(totalTime);

const modal = document.querySelector('#modal');
const restartBtn = document.querySelector('#restartBtn');
const scoreArea = document.querySelector('#score');
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name');


window.localStorage.setItem('name', userName);


function setName(){
  document.getElementById('name') = localStorage.getItem('name');
}

// Starting the clicks for local storage
function startMostClicks(clicksMax, BTN){
  if (localStorage.getItem('mostClicks') === null || localStorage.getItem('mostClicks') < clicksMax){
    localStorage.setItem('mostClicks', clicksMax);
    localStorage.setItem('Button', BTN );
  }
  else{
    document.getElementById('mostcickedBTN').innerText = localStorage.getItem('Button');
    document.getElementById('clicks').innerText = localStorage.getItem('mostClicks');
  }
}

//Starting the highest score 

function startScore(){
  if (localStorage.getItem('score') === null || localStorage.getItem('score') < score ){
    console.log('test');
    window.localStorage.setItem('score', score);
  }
  else{
    document.getElementById('highScore').innerText = localStorage.getItem('score');
  }
}


// This is for getting buttons
const buttonClicks = {};

const answerButtons = document.getElementsByClassName('answer-button');

Array.from(answerButtons).forEach((button) => {
    button.addEventListener('click', function () {
      const buttonId = button.id;
      if (!buttonClicks[buttonId]) {
        buttonClicks[buttonId] = 1;
      } else {
        buttonClicks[buttonId]++;
      }
      window.localStorage.setItem(buttonId, buttonClicks[buttonId]);
    });
  });

// This function updates the most clicked button on the metrics
function mostClicked(buttonArray){
    let max = 0;
    let mostClickedBTN = null;
    for (let i = 0; i < buttonArray.length; i++){
      if (buttonClicks[buttonArray[i].id] >= max){
        max = buttonClicks[buttonArray[i].id];

        mostClickedBTN = buttonArray[i].id;
      }
      startMostClicks(max, mostClickedBTN);
    }
  }

function setName(){
  const user = localStorage.getItem('name');
  document.getElementById('name').innerText = user;
}

// Checks the metrics for score and selects the highest one

function setScoreMetric(){
  let currentHighest = localStorage.getItem('score');
  if (currentHighest < score){
    window.localStorage.setItem('score', score);
    document.getElementById('highScore').innerText = localStorage.getItem('score');
  }
}

function setMetrics(){
  setScoreMetric();
  setName();
  mostClicked(Array.from(answerButtons));

}


// This function starts the timer
function startTimer(totalTime){
    updateTimer();
    timeLeft = totalTime;

    intervalID = setInterval(function() {
        timeLeft -= 0.1;
        updateTimer();

        if (timeLeft <= 0){
            clearInterval(intervalID);
            setMetrics();
            modal.showModal();
        }
    }, 100);

    const timeElement = document.getElementById('time-left');
    timeElement.innerText = timeLeft - 0.1;
}

// This function updates the timer
function updateTimer(){
    if (timeLeft >= 0){
        document.querySelector('#time-left').innerText = Math.round(timeLeft*100)/100;
        // This changes the width of the timer bar that is filled
        let width = Math.round(300 * (timeLeft/totalTime));
        document.getElementById('timerbar-amount').style.width = `${width}px`;
    }
}


// restarts game when you click the Play Again button on modal

restartBtn.addEventListener('click', () => {
    scoreArea.innerText = 0;
    modal.close();
    document.getElementById('timerbar-amount').style.width = '300px';
    totalTime = 10;
    startGame(10);
})


// Generates a question to answer
function generateQuestion(){
    let termOne = Math.round(Math.random()*19 +1 );
    let termTwo = Math.round(Math.random()*19 +1 );

    document.getElementById('question').innerText = termOne + " * " + termTwo + " = ?";

    correctAnswer = termOne*termTwo;

    generateAnswers(correctAnswer);
    document.getElementById('timerbar-amount').style.width = '300px';
}

// Generates answers for the buttons
function generateAnswers(correctAnswer){
    let answers = document.getElementsByClassName('answer-button');
    correctAnswerButton = Math.floor( Math.random() * 4);
    let answer = answers[ correctAnswerButton ];
    answer.innerText = correctAnswer;
    // window.localStorage.setItem('score', score);

    for (let i = 0; i < 4; i++){
        if (i != correctAnswerButton){
            answers[i].innerText = Math.round(Math.random()*19 +1 ) * Math.round(Math.random()*19 +1 );
        }
    }
}

//Checks the answer of the button given
function checkAnswer(btnID){
    clearInterval(intervalID);
    if ( btnID.innerText == correctAnswer ){
        totalTime *=0.95;
        score +=1;
        scoreArea.innerHTML = score;
        // Generates new question and resets time to answer for next question
        generateQuestion();
        startTimer(totalTime);
        
    }
    else{
        clearInterval(intervalID);
        modal.showModal();
        document.querySelector('#finalScore').innerText = score;
        setMetrics();
    }
}

//function to start the game
function startGame(totalTime){
    score = 0;
    
    startScore();

    timeLeft = totalTime;
    startTimer(totalTime);
    generateQuestion();
}








