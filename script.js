/*
Author-Jackie Chen
*/

// Global Variables
const clueWaitTime = 333; //how long to pause in between clues
const clueHoldTime = 1000;
const numButtons = 4;

var sequence = [0,0,0,0,0,0,0,0]; // initalized pattern for testing purposes
var score = 0;
var playing = false;
var sound = false;
var volume = 0.5;


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

  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  generateSequence();
  playGame();
}
function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  reset=true;
}