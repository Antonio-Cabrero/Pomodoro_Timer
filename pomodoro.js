

//Elements

const timerSec = document.getElementById('sec'),
      timerMin = document.getElementById('minutes'),
      timerField = document.querySelector('.userMin'),
      startInt = document.querySelector('.start'),
      resetBtn = document.querySelector('.reset'),
      pauseInt = document.querySelector('.stop'),
      timerBody = document.querySelector('.pomodoro'),
      workCounter = document.querySelector('.work-counter').children,
      alertContainer = document.querySelector('#alert'),
      breakBtn = document.querySelector('.break'),
      continueBtn = document.querySelector('.continue');


// Chime Sound

const chimeBell = document.querySelector('.chime');

// Key Variables

let timer;
let working = false;
let onBreak = false;
let pause = false;            // TRACKER FOR PAUSE ACTION
let workSession = 0;          // TRACKER FOR WORK SESSIONS
let seconds = 0;              // SETS SECONDS
let minutes;                
let intervalMin = null;

timerSec.innerHTML = "00"; 
timerMin.innerHTML = "20"; 


// Functions

function sessionTimer() { 
  
  timer = setInterval( () => { // RUNS EACH FUNCTION EVERY SECOND
    
    pauseBtn(timer);              //  CHECKS FOR PAUSING
    secondsCounter();             //  SUBTRACTS 1 SECOND & CHECKS IF SECONDS IS NOT 0, IF ITS THEN IT SUBSTRACTS 1 FROM MINUTES AND RESETS THE SECONDS 
    printTime();                  //  PRINTS NUMBERS TO DOM
    timerStop(timer);             //  STOPS TIMER IF MINUTES & SECONDS REACHES 0

  }, 1000)
}

function setMinutes () {
  if (intervalMin !== null) { return minutes = intervalMin} 
  minutes = 20
}

function sessionSetUp () {                   // SETS THE TIME OF THE SESSION
  
  setMinutes()  // IF NO CUSTOM INTERVAL WAS GIVEN THEN DEFAULT IS SET                                          
  seconds = 0
  timerSec.innerHTML = "00"; 
  timerMin.innerHTML = `${minutes}`; 
}

function startSession () {
  
  timerBody.style.backgroundColor = '#399721';  // SETS BACK GROUND TO COLOR FOR 'IN WORK SESSION'
  sessionSetUp();
  sessionTimer();                               // STARTS TIMER

} 

function breakSession () { // STARTS A BREAK TIMER
  
  if (workSession === 4) {  // CHECK IF USER HAS HAD 4 WORK SESSIONS (COUNTER STARTS AT 0)
    minutes = 20;           // LONG BREAK IS SET
    resetWork();
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
    seconds = 59;        // RESTARTS SECONDS AND SUBTRACTS 1 FROM MINUTES
    minutes -= 1; 
  }

}

function timerStop(timer) {

  if (minutes === 0 && seconds === 0) {
    
    clearInterval(timer);                                                 // STOPS INTERVAL
    timerBody.style.backgroundColor = '#1e7fda';                          // Bg COLOR CHANGE TO BREAK COLOR
    workCounter[ workSession ].style.backgroundColor = '#399721';         // ADD 1 TO WORK SESSION TRACKER
    workSession += 1;                                                     // ALSO ADD 1 TO THE VARIABLE WORK COUNTER
    alertDisplay();
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


function resetWork() {

  workSession = 0;                                 // RESETS SESSION TRACKER
  for (let i = 0; i < workCounter.length; i ++){
    workCounter[i].style.backgroundColor = "#ccc"; // CHANGE WORK SESION TRACKERS BACK TO GREY
  }

}

function alertDisplay () {

  let text = document.querySelector('.modal-content');
  
  chimeBell.play();                                   // PLAY CHIME BELL
  
  alertContainer.style.display = "block";            // DISPLAY ALERT

  if (onBreak === true) {                                                               // DISPLAYS BACK TO WORK MESSAGE
    text.innerHTML =
    `<h2 class="modal-title display-4 mx-auto mt-3">It's time to work!</h2>
      <p class="modal-body mx-auto">Keep on the good work after that nice break!</p>
      <div class="mx-auto mb-3">
      <button class="btn btn-outline-success continue">Keep going!</button>
      </div>
      `;

  } else if (workSession === 4) {                                                       // DISPLAYS LONG BREAK MESSAGE
    text.innerHTML = `
      <h2 class="modal-title display-4 mx-auto mt-3">It's time for a long break!</h2>
      <p class="modal-body mx-auto">Go walk for a bit, get something to eat or just stretch it out! You've earned it!</p>
      <div class="mx-auto mb-3">
          <button class="btn btn-outline-primary break">Break</button>
      </div>
    ` ;
  } else if (workSession < 4) {                                                       // DISPLAYS SHORT BREAK MESSAGE
    text.innerHTML = `
      <h2 class="modal-title display-4 mx-auto mt-3">It's time for a short break!</h2>
      <p class="modal-body mx-auto">Go get a coffee or a snack, walk a bit or would you like to keep going?</p>
      <div class="mx-auto mb-3">
          <button class="btn btn-outline-primary break">Break</button>
          <button class="btn btn-outline-success continue">Keep going!</button>
      </div>
      `;
  }
}

function stopBell() {  // STOPS AND RESETS THE BELL SOUND
  chimeBell.pause();
  chimeBell.currentTime = 0;
}

function hideButtons () {

  
  startInt.disabled = true
  pauseInt.disabled = true
  startInt.style.opacity = "0"
  pauseInt.style.opacity = "0"
  startInt.style.transform = "translateX(150px)"
  pauseInt.style.transform = "translateX(-150px)"
  resetBtn.innerText = "Ok"
}

function unhideButtons() {
 
    startInt.style.opacity = "1"
    pauseInt.style.opacity = "1"
    startInt.style.transform = "translateX(0px)"
    pauseInt.style.transform = "translateX(0px)"
    startInt.disabled = false
    pauseInt.disabled = false
    resetBtn.innerText = "Reset"
}

function validateInput() {
  let reg = /\D/g
  let input =timerField.value
  let test = input.replace(reg, '')

  if (test !== "" && test > 0) {
   intervalMin = test
   return timerField.value = test
  }
  let warning = prompt('Use numbers only (from 1 to 60)')
  intervalMin = warning
  timerField.value = warning
  return warning
}

// Listeners

startInt.addEventListener('click', ()=>{ 

  if (pause === false && working === false) {     // CHEKS OF PROGRAM IS NOT ON PAUSE and PREVENTS  TIMER FROM STARTING AGAIN
    startSession();                               // START A NEW WORK SESSION
    working = true;

  } else if (pause === true) {  // CHECKS IF PROGRAM IS ON PAUSE
    pause = false;              // CHANGES PAUSE VALUE (TO UNPAUSE)
    sessionTimer();             // CONTINUES TIMER
  }

});

resetBtn.addEventListener('click', (e)=> {
  let element = e.target;

  if (element === resetBtn) {
    clearInterval(timer);
    working = false;
    timerBody.style.backgroundColor = "#660b0b"
    sessionSetUp();
  }
})


alertContainer.addEventListener('click', (e)=> {
  let element = e.target;

  if (element.innerText === 'Break') {               // CHECKS IF BREAK BTN IS CLICKED
    onBreak = true;
    working = false;
    stopBell();
    breakSession();                                  // TRIGGERS BREAK SESSION FUNCTION
    alertContainer.style.display = "none";           // HIDES ALERT BOX

  } 

  if (element.innerText === 'Keep going!') {            // CHECKS IF BREAK BTN IS CLICKED
    onBreak = false;
    stopBell();
    startSession();                                     // TRIGGERS WORK SESSION FUNCTION
    alertContainer.style.display = "none";              // HIDES ALERT BOX

  }

});

timerBody.addEventListener('click', (e)=> {
  
    if (e.target === timerMin && working === false) {
      timerMin.style.display = "none"
      timerField.style.display = "inline-block"
      hideButtons()
    }
    
    if (e.target.innerText === "Ok") {
        intervalMin = validateInput();
        timerField.style.display = "none";
        timerMin.innerText = `${intervalMin}`;
        timerMin.style.display = "block";
        unhideButtons()
    }
})

 