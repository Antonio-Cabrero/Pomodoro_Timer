

//Elements

const timerSec = document.getElementById('sec'),
      timerMin = document.getElementById('minutes'),
      timerField = document.querySelector('.userMin'),
      startBtn = document.querySelector('.start'),
      resetBtn = document.querySelector('.reset'),
      timerBody = document.querySelector('.pomodoro'),
      workCounter = document.querySelector('.work-counter').children,
      alertContainer = document.querySelector('#alert'),
      breakBtn = document.querySelector('.break'),
      continueBtn = document.querySelector('.continue'),
      infoBtn = document.querySelector('.info'),
      infoDiv = document.querySelector('#accordion'),
      btnsContainer = document.querySelector('.buttons');


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
  
  timerBody.style.backgroundColor = '#6ED05E';  // SETS BACK GROUND TO COLOR FOR 'IN WORK SESSION'
  sessionSetUp();
  sessionTimer();                               // STARTS TIMER
  working = true;
} 

function breakSession () { // STARTS A BREAK TIMER
  
  if (workSession === 4) {  // CHECK IF USER HAS HAD 4 WORK SESSIONS (COUNTER STARTS AT 0)
    minutes = 20;           // LONG BREAK IS SET
    resetWork();
    sessionTimer();         // TIMER STARTS
    startBtn.style.opacity = "0"
    startBtn.disabled = true
   } else {
    minutes = 20;            // SETS A SMALL BREAK
    sessionTimer();         // TIMER STARTS
    startBtn.style.opacity = "0"
    startBtn.disabled = true

  }

}

function displayToogle(element) {
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none"
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
    timerBody.style.backgroundColor = '#5E99D0';                          // Bg COLOR CHANGE TO BREAK COLOR
    workCounter[ workSession ].style.backgroundColor = '#6ED05E';         // ADD 1 TO WORK SESSION TRACKER
    workSession += 1;                                                     // ALSO ADD 1 TO THE VARIABLE WORK COUNTER
    alertDisplay();
  } 

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
    startBtn.style.opacity = "1";
    startBtn.disabled = false

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

alertContainer.addEventListener('click', (e)=> {
  let element = e.target;

  if (element.innerText === 'Break') {               // CHECKS IF BREAK BTN IS CLICKED
    onBreak = true;
    working = false;
    stopBell();
    breakSession();                                  // TRIGGERS BREAK SESSION FUNCTION
    displayToogle(alertContainer)          // HIDES ALERT BOX

  } 

  if (element.innerText === 'Keep going!') {            // CHECKS IF BREAK BTN IS CLICKED
    onBreak = false;
    stopBell();
    startSession();                                     // TRIGGERS WORK SESSION FUNCTION
    displayToogle(alertContainer)          // HIDES ALERT BOX

  }

});

timerBody.addEventListener('click', (e)=> {
  
  if (e.target === timerMin && working === false) {
    displayToogle(timerMin)
    timerField.style.display = "inline-block"
    resetBtn.innerHTML = "OK"
  }

    
})

 infoBtn.addEventListener('click', ()=> {

  displayToogle(infoDiv);
  
 })

 startBtn.addEventListener('click', ()=>{ 

  if (pause === false && working === false) {     // CHEKS OF PROGRAM IS NOT ON PAUSE and PREVENTS  TIMER FROM STARTING AGAIN
    startSession();                               // START A NEW WORK SESSION
    startBtn.innerHTML = `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H13.2174V42H0V0Z" fill="#313131"/>
                            <path d="M18.7826 0H32V42H18.7826V0Z" fill="#313131"/>
                          </svg>`

  } 
  else  if (working === true && pause === false){    // CHECKS IF PAUSE BUTTON IS CLICKED   
    pause = true;               // CHANGES VALUE OF PAUSE VARIABLE
    clearInterval(timer);       // STOPS INTERVAL  
    startBtn.innerHTML = `<svg width="40" height="52" viewBox="-5 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36 26L0.750001 51.1147L0.750004 0.885262L36 26Z" fill="#000"/>
                          </svg>`
  }
  
  else if (working === true && pause === true) {  // CHECKS IF PROGRAM IS ON PAUSE
    pause = false;              // CHANGES PAUSE VALUE (TO UNPAUSE)
    sessionTimer();             // CONTINUES TIMER
    startBtn.innerHTML = `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H13.2174V42H0V0Z" fill="#313131"/>
    <path d="M18.7826 0H32V42H18.7826V0Z" fill="#313131"/>
    </svg>`
  }

});

 resetBtn.addEventListener('click', ()=> {

  clearInterval(timer);
  working = false;
  pause = false;
  onBreak = false;
  timerBody.style.backgroundColor = "#D05E5E"
  sessionSetUp();

if (resetBtn.innerHTML === "OK") {
  intervalMin = validateInput();
  displayToogle(timerField)
  timerMin.innerText = `${intervalMin}`;
  timerMin.style.display = "block";
  resetBtn.innerHTML = `<svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.75945 11.1315C7.5283 8.50113 10.106 6.51871 13.1023 5.48435L15.4924 12.4081C14.0011 12.9229 12.718 13.9097 11.8376 15.2189C10.9572 16.5281 10.5273 18.0886 10.613 19.664C10.6987 21.2394 11.2954 22.744 12.3127 23.95C13.3299 25.156 14.7125 25.9977 16.2509 26.3477C17.7893 26.6977 19.3999 26.5369 20.8388 25.8897C22.2777 25.2425 23.4665 24.1441 24.2254 22.7608C24.9842 21.3775 25.2717 19.7847 25.0443 18.2234C24.8797 17.0937 24.4521 16.0251 23.8033 15.1004L21.234 18.314L16.7577 4.78024L30.9449 6.16777L28.4701 9.26313C30.5232 11.4397 31.86 14.1988 32.2925 17.1677C32.7493 20.3044 32.1718 23.5045 30.6472 26.2836C29.1227 29.0627 26.7343 31.2694 23.8434 32.5697C20.9526 33.87 17.7169 34.193 14.6261 33.4898C11.5353 32.7867 8.75769 31.0956 6.71389 28.6728C4.67009 26.2499 3.47134 23.227 3.29912 20.0619C3.12691 16.8968 3.9906 13.7618 5.75945 11.1315Z" fill="#313131"/>
                        </svg>`
}
})