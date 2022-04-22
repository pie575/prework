/*
Author-Jackie Chen
*/

// Global Variables
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const cluePauseTime = 333; //how long to pause in between clues
const numButtons = 4;

var pattern = [0,0,0,0,0,0,0,0]; // initalized pattern for testing purposes
var score = 0;
var playing = false;
var sound = false;
var volume = 0.5;