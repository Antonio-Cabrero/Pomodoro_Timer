

//Elements

const timerSec = document.getElementById('sec'),
      timerMin = document.getElementById('minutes'),
      startInt = document.querySelector('.start'),
      pauseInt = document.querySelector('.stop'),
      timerBody = document.querySelector('.pomodoro'),
      workCounter = document.querySelector('.work-counter'),
      alertContainer = document.querySelector('#alert'),
      breakBtn = document.querySelector('.break'),
      continueBtn = document.querySelector('.continue');


// Key Variables

let timeForBreak = false;
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
    printTime();
    timerStop(timer);

  }, 1000)
  
}

function startSession () {
  timerBody.style.backgroundColor = '#399721';
  minutes = 1; 
  sessionTimer();
} 

function breakSession() {
  
  if (workSession === 3) {
    minutes = 20;
    sessionTimer();

   } else if (minutes === 0) {
    
    minutes = 5;
    sessionTimer();

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
    timerBody.style.backgroundColor = '#1e7fda';
    alertContainer.style.display = "block";
    workCounter.children[ workSession ].style.backgroundColor = '#399721';
    workSession += 1;
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


// Listeners

startInt.addEventListener('click', ()=>{
  
    if (pause === false) { // START TIMER 
      startSession();
    } else if (pause === true) { // UNPAUSE TIMER
      pause = false;
      sessionTimer();
    }

});


alertContainer.addEventListener('click', (e)=> {
  let element = e.target;
  if (element === breakBtn) {
    breakSession();
    alertContainer.style.display = "none";
  } else if (element === continueBtn) {
    startSession();
    alertContainer.style.display = "none";
  }
})
