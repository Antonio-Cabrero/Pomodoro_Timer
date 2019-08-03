

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

let timeForBreak = false;     // TRACKER FOR BREAK ACTION
let pause = false;            // TRACKER FOR PAUSE ACTION
let workSession = 0;          // TRACKER FOR WORK SESSIONS
let seconds = 5;              // SETS SECONDS
let minutes;                

timerSec.innerHTML = "00"; 
timerMin.innerHTML = "00"; 


// Functions

function sessionTimer() { // TIMER
  
  let timer = setInterval( () => { // RUNS EACH FUNCTION EVERY SECOND
    
    
    pauseBtn(timer);              //  CHECKS FOR PAUSING
    secondsCounter();             //  SUBTRACTS 1 SECOND & CHECKS IF SECONDS IS NOT 0, IF ITS THEN IT SUBSTRACTS 1 FROM MINUTES AND RESETS THE SECONDS 
    printTime();                  //  PRINTS NUMBERS TO DOM
    timerStop(timer);             //  STOPS TIMER IF MINUTES & SECONDS REACHES 0

  }, 1000)
  
}

function startSession () {
  timerBody.style.backgroundColor = '#399721';  // SETS BACK GROUND TO COLOR FOR 'IN WORK SESSION'
  minutes = 1;                                  // SETS THE TIME OF THE SESSION
  sessionTimer();                               // STARTS TIMER
} 

function breakSession() { // STARTS A BREAK TIMER
  
  if (workSession === 3) {  // CHECK IF USER HAS HAD 4 WORK SESSIONS (COUNTER STARTS AT 0)
    minutes = 20;           // LONG BREAK IS SET
    sessionTimer();         // TIMER STARTS

   } else {
    
    minutes = 5;            // SETS A SMALL BREAK
    sessionTimer();         // TIMER STARTS

  }

}

function printTime () {   

    timerSec.innerHTML = seconds; // PRINTS TO DOM
    timerMin.innerHTML = minutes; // PRINTS TO DOM

    if (minutes < 10 ) {                     // ADDS A '0' IF VALUE IS LESS THAN 10
      timerMin.innerHTML = "0" + minutes;
    } 

    if ( seconds < 10) {                    // ADDS A '0' IF VALUE IS LESS THAN 10
    timerSec.innerHTML = "0" + seconds;
    }
}

function secondsCounter() {

    seconds -= 1;         // DECREASES SECONDS BY 1
    if (seconds === -1) {  
      seconds = 5;        // RESTARTS SECONDS AND SUBTRACTS 1 FROM MINUTES
      minutes -= 1; 
    } 
}

function timerStop(timer) {

  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);                                                 // STOPS INTERVAL
    timerBody.style.backgroundColor = '#1e7fda';                          // Bg COLOR CHANGE TO BREAK COLOR
    alertContainer.style.display = "block";                               // DISPLAY ALERT
    workCounter.children[ workSession ].style.backgroundColor = '#399721';// ADD 1 TO WORK SESSION TRACKER
    workSession += 1;                                                     // ALSO ADD 1 TO THE VARIABLE WORK COUNTER
  } 

}

function pauseBtn(timer){         // CREATES EVENT LISTENER FOR PAUSE BTN
  pauseInt.addEventListener('click', (e) => {
      
    let element = e.target;
    if (element === pauseInt){    // CHECKS IF PAUSE BUTTON IS CLICKED
    
      pause = true;               // CHANGES VALUE OF PAUSE VARIABLE
      clearInterval(timer);       // STOPS INTERVAL
    
    } 
  })
}


// Listeners

startInt.addEventListener('click', ()=>{ 
  
    if (pause === false) {        // CHEKS OF PROGRAM IS NOT ON PAUSE
      startSession();             // START A NEW WORK SESSION

    } else if (pause === true) {  // CHECKS IF PROGRAM IS ON PAUSE
      pause = false;              // CHANGES PAUSE VALUE (TO UNPAUSE)
      sessionTimer();             // CONTINUES TIMER
    }

});


alertContainer.addEventListener('click', (e)=> {
  let element = e.target;

  if (element === breakBtn) {               // CHECKS IF BREAK BTN IS CLICKED

    breakSession();                         // TRIGGERS BREAK SESSION FUNCTION
    alertContainer.style.display = "none";  // HIDES ALERT BOX

  } 
  
  if (element === continueBtn) {            // CHECKS IF BREAK BTN IS CLICKED

    startSession();                         // TRIGGERS WORK SESSION FUNCTION
    alertContainer.style.display = "none";  // HIDES ALERT BOX

  }
})
