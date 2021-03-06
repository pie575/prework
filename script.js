/*
Author-Jackie Chen
*/

// Global Variables
const clueWaitTime = 333; //how long to pause in between clues
const clueHoldTime = 1000;
const numButtons = 4;
const volume = 0.5;
const size = 8

var sequence = []; // initalized pattern for testing purposes
var score = 0;
var guessCount = 0;
var playing = false;
var sound = false;


// Functions for modularity
function generateSequence() {
  // sequence of buttons the game will play
  for (let i = 0; i < size; i++) {
    sequence[i] = Math.ceil(Math.random() * numButtons);
  }
}

function startGaming() {
  console.log("Game has started")
  generateSequence();
  console.log(sequence);
  playing = true;
  score = 0;
  guessCount = 0;

  document.getElementById("startButton").classList.add("hidden");
  document.getElementById("stopButton").classList.remove("hidden");
  
  playGame();
}

function stopGaming() {
  console.log("Game has ended")
  playing = false;
  document.getElementById("startButton").classList.remove("hidden");
  document.getElementById("stopButton").classList.add("hidden");
}

function playSound(buttonNumber, length) {
  o.frequency.value = frequencies[buttonNumber];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  sound = true;
  setTimeout(function() {
    stopSound();
  }, length); 
}

function startSound(btn) {
  if (!sound) {
    o.frequency.value = frequencies[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    sound = true;
  }
}

function stopSound() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  sound = false;
}

const frequencies = {
  1: 415,
  2: 310,
  3: 252,
  4: 209
} // traditional simon says frequencies

// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

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
  guessCount = 0;
  let delay = clueHoldTime; 
  for (let i = 0; i <= score; i++) {
    // for each clue that is revealed so far
    setTimeout(playSingleClue, delay, sequence[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += clueWaitTime;
  } 
}

function defeat() {
  stopGaming();
  alert("Game Over. You lost.");
}

function victory() {
  stopGaming();
  alert("Game Over. You won!");
}

function guess(btn) {
  console.log("guessed: " + btn);
  console.log(guessCount);

  if (!playing) {
    return;
  }

  // Logic
  if (btn === sequence[guessCount]) {
    if (guessCount === score) {
    // correct guess
      if (score === size - 1) {
        //WIN!
        victory(); 
      } 
      else {
        //not win yet
        score++;
        
        playGame();
        console.log("Score is: " +score);
      }
    } 
    else {
      guessCount++;
    }
  } 
  else {
    console.log("Answer was:");
    console.log(sequence[guessCount]);
    console.log(btn);
    //Guess was incorrect
      //GAME OVER: LOSE!
      defeat();
  }
}
