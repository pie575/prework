/*
Author-Jackie Chen
*/

// Global Variables
const clueWaitTime = 333; //how long to pause in between clues
const clueHoldTime = 1000;
const numButtons = 4;
const volume = 0.5;
const frequencies = [415,310,252,209]; // traditional simon says sounds

var sequence = [0,0,0,0,0,0,0,0]; // initalized pattern for testing purposes
var score = 0;
var playing = false;
var sound = false;

// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);


// Functions for modularity
function generateSequence() {
  // sequence of buttons the game will play
  for (let i = 0; i < sequence.length; i++) {
    sequence[i] = Math.ceil(Math.random() * numButtons);
  }
}

function startGame() {
  playing = true;
  score = 0;

  document.getElementById("startButton").classList.add("hidden");
  document.getElementById("stopButton").classList.remove("hidden");
  
  generateSequence();
  playGame();
}

function stopGame() {
  playing = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

function playSound(buttonNumber, length) {
  o.frequency.value = frequencies[buttonNumber];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  sound = true;
  setTimeout(function() {
    stopSound();
  }, length); 
}

function stopSound() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  sound = false;
}

function lightButton(buttonNum) {
  document.getElementById("button" + buttonNum).classList.add("lit");
}

function extinguishButton(buttonNum) {
  document.getElementById("button" + buttonNum).classList.remove("lit");
} 

function playSingleClue(buttonNum) {
  if (playing) {
    lightButton(buttonNum);
    playSound(buttonNum, clueHoldTime);
    setTimeout(extinguishButton, clueHoldTime, buttonNum);
  }
}

function playGame() {
  score = 0;
  let delay = clueHoldTime; //set delay to initial wait time
  for (let i = 0; i <= score; i++) {
    // for each clue that is revealed so far
    setTimeout(playSingleClue, delay, sequence[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += clueWaitTime;
  } 
}

function defeat() {
  stopGame();
  alert("Game Over. You lost.");
}

function victory() {
  stopGame();
  alert("Game Over. You won!");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!playing) {
    return;
  }

  // add game logic here
  if (btn === sequence[guessCounter]) {
    //Guess was correct!
    if (guessCounter === progress) {
      if (progress === pattern.length - 1) {
        //GAME OVER: WIN!
        winGame(); 
        reset = true;
      } else {
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else {
    //Guess was incorrect
    mistakes++;
    if (mistakes === 3) {
      //GAME OVER: LOSE!
      loseGame();
      reset = true;
    } else {
      //Increment errors
      alert("Wrong! Attempts left:" + (3 - mistakes));
    }
  }
}