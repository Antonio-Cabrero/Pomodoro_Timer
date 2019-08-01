//Elements

const timerSec = document.getElementById('sec');
const timerMin = document.getElementById('minutes');
const startInt = document.querySelector('.start');
const pauseInt = document.querySelector('.stop');
const timerBody = document.querySelector('.pomodoro');
const beakCounter = document.querySelector('.break-counter');
const workCounter = document.querySelector('.work-counter');


// Key Variables
let working = null;
let onBreak = false;
let pause = false;
let workSession = 0;
let breaks = 0;
let seconds = 5;
let minutes;
timerSec.innerHTML = "00"; // prints values
timerMin.innerHTML = "00"; // prints values


// Functions

function sessionTimer() { // runs this every second
  
  let timer = setInterval( () => {
    
    pauseBtn(timer);    
    secondsCounter();
    timerStop(timer);
    printTime();

  }, 1000)
}

function startSession () {
  timerBody.style.backgroundColor = '#399721';
  minutes = 1; 
  sessionTimer();
} 

function breakSession() {
  
  if (workSession === 4) {
    timerBody.style.backgroundColor = '#1e7fda';
    minutes = 20;
    sessionTimer();

   } else if (minutes === 0 && seconds === -1){
    timerBody.style.backgroundColor = '#1e7fda';
    minutes = 5;
    sessionTimer();
    //Adds green to spans to mark completed sessions
    workCounter.children[workSession].style.backgroundColor = '#399721';
    workSession += 1;
    timerBody.style.backgroundColor = "#660b0b";

  }

}

function printTime () {   

    timerSec.innerHTML = seconds; // prints values
    timerMin.innerHTML = minutes; // prints values

    if (minutes < 10 ) {    // add a 0 before current value
      timerMin.innerHTML = "0" + minutes;
    } 

    if ( seconds < 10) {    // add a 0 before current value
    timerSec.innerHTML = "0" + seconds;
    }
}

function secondsCounter() {

    seconds -= 1;
    if (seconds === -1) {  
      seconds = 5;
      minutes -= 1; 
    } 
}

function timerStop(timer) {

  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
  }

}

function pauseBtn(timer){
  pauseInt.addEventListener('click', (e) => {
      
    let element = e.target;
    if (element === pauseInt){
    
      pause = true;
      clearInterval(timer);
    
    } 
  })
}

function breakChecker() {
  if (onBreak === true) {

  }
}
// Listeners

startInt.addEventListener('click', ()=>{
  
    if (pause === false) { // START TIMER 
      startSession();
    } else if (pause === true) { // UNPAUSE TIMER
      pause = false;
      sessionTimer();
    }

});



