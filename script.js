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
    stopTone();
  }, length); 
}

// Init Sound Synthesizer