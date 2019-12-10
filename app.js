import jsx from './JSX'
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

function timerFunction() { 
  
  timer = setInterval( () => { // RUNS EACH FUNCTION EVERY SECOND
    secondsDeductor();             //  SUBTRACTS 1 SECOND & CHECKS IF SECONDS IS NOT 0, IF ITS THEN IT SUBSTRACTS 1 FROM MINUTES AND RESETS THE SECONDS 
    printTime();                  //  PRINTS NUMBERS TO DOM
    timerStop(timer);             //  STOPS TIMER IF MINUTES & SECONDS REACHES 0
  }, 1000)
}

function setDefault () {
  if (intervalMin !== null) { return minutes = intervalMin} 
  minutes = 20
}

function sessionSetUp () {                   // SETS THE TIME OF THE SESSION
  
  setDefault()  // IF NO CUSTOM INTERVAL WAS GIVEN THEN DEFAULT IS SET                                          
  seconds = 0
  printTime()
}

function startSession () {
  timerBody.style.backgroundColor = '#6ED05E';  // SETS BACK GROUND TO COLOR FOR 'IN WORK SESSION'
  sessionSetUp();
  timerFunction();                               // STARTS TIMER
  working = true;
} 

function breakSession () { // STARTS A BREAK TIMER
  
  if (workSession === 4) {  // CHECK IF USER HAS HAD 4 WORK SESSIONS (COUNTER STARTS AT 0)
    minutes = 20;           // LONG BREAK IS SET
    timerFunction();         // TIMER STARTS
    resetWork();
    startBtn.style.opacity = "0"
    startBtn.disabled = true
   } else {
    minutes = 5;            // SETS A SMALL BREAK
    timerFunction();         // TIMER STARTS
    startBtn.style.opacity = "0"
    startBtn.disabled = true

  }

}

function displayToogle(element) {
   element.style.display === "none"? element.style.display = "block"   
                                   : element.style.display = "none"
}

function fadeToogle(element) {
  element.style.opacity === "0"?  element.style.opacity = "1" 
                                : element.style.opacity = "0"
}

function printTime () {   
  timerSec.innerHTML = seconds; // PRINTS TO DOM
  timerMin.innerHTML = minutes; // PRINTS TO DOM

  minutes < 10 ? timerMin.innerHTML = "0" + minutes : null // ADDS A '0' IF VALUE IS LESS THAN 10
  seconds < 10? timerSec.innerHTML = "0" + seconds : null // ADDS A '0' IF VALUE IS LESS THAN 10
}

function secondsDeductor() {

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
    text.innerHTML = jsx.onBreak;
    startBtn.style.opacity = "1";
    startBtn.disabled = false
  } else if (workSession === 4) {                                                       // DISPLAYS LONG BREAK MESSAGE
    text.innerHTML = jsx.workSessionComplete;
  } else if (workSession < 4) {                                                       // DISPLAYS SHORT BREAK MESSAGE
    text.innerHTML = jsx.workSessionIncomplete;
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
 
  switch (e.target.innerText) {
      case 'Break': {               // CHECKS IF BREAK BTN IS CLICKED
            onBreak = true;
            working = false;
            stopBell();
            breakSession();                                  // TRIGGERS BREAK SESSION FUNCTION
            displayToogle(alertContainer)          // HIDES ALERT BOX
            } 

      case 'Keep going!': {            // CHECKS IF BREAK BTN IS CLICKED
            onBreak = false;
            stopBell();
            startSession();                                     // TRIGGERS WORK SESSION FUNCTION
            displayToogle(alertContainer)          // HIDES ALERT BOX
            }

      case 'Long Break': {               // CHECKS IF BREAK BTN IS CLICKED
            onBreak = true;
            working = false;
            stopBell();
            breakSession();                                  // TRIGGERS BREAK SESSION FUNCTION
            displayToogle(alertContainer)          // HIDES ALERT BOX
            } 
  }
});

timerBody.addEventListener('click', (e)=> {
  
  if (e.target === timerMin && working === false) {
      if (timerField.value !== "") {
        timerField.value = ""
      }
    displayToogle(timerMin)
    startBtn.disabled = true
    timerField.style.display = "inline-block"
    resetBtn.innerHTML = "OK"
  }

    
})

 infoBtn.addEventListener('click', ()=> {

  const cards = document.querySelectorAll(".card")
  const card = document.querySelector(".card")

  if (card.style.display === "none"){
    cards.forEach(element => {
      displayToogle(element)
    });
    setTimeout(()=>{
      cards.forEach(element => {
        fadeToogle(element)
      })
    },50)
    
  } else {
    cards.forEach(element => {
      fadeToogle(element)
    });
    setTimeout(()=>{
      cards.forEach(element => {
        displayToogle(element)
      })
    },400)
  }
 })

 startBtn.addEventListener('click', ()=>{ 

  if (pause === false && working === false) {     // CHEKS OF PROGRAM IS NOT ON PAUSE and PREVENTS  TIMER FROM STARTING AGAIN
    startSession();                               // START A NEW WORK SESSION
    startBtn.innerHTML = jsx.pauseSvg;

  } 
  else  if (working === true && pause === false){    // CHECKS IF PAUSE BUTTON IS CLICKED   
    pause = true;               // CHANGES VALUE OF PAUSE VARIABLE
    clearInterval(timer);       // STOPS INTERVAL  
    startBtn.innerHTML = jsx.playSVG;
  }
  
  else if (working === true && pause === true) {  // CHECKS IF PROGRAM IS ON PAUSE
    pause = false;              // CHANGES PAUSE VALUE (TO UNPAUSE)
    timerFunction();             // CONTINUES TIMER
    startBtn.innerHTML = jsx.pauseSvg;
}

});

 resetBtn.addEventListener('click', ()=> {
  resetWork();
  clearInterval(timer);
  working = false;
  pause = false;
  onBreak = false;
  startBtn.style.opacity = "1";
  startBtn.disabled = false;
  timerBody.style.backgroundColor = "#D05E5E"
  startBtn.innerHTML =  jsx.playSVG;
  sessionSetUp();

if (resetBtn.innerHTML === "OK") {
  intervalMin = validateInput();
  displayToogle(timerField)
  minutes = intervalMin
  printTime()
  timerMin.style.display = "block";
  resetBtn.innerHTML = jsx.playSVG;
}
})