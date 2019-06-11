//Timer Fuction

//seonds
function timerSec() {

    var sec = 5;
    seconds = setInterval(function () 
      {  
        sec = sec - 1;
        if (sec == 0) {
            clearInterval(seconds);
        }
        console.log(sec); 
            
        }, 1000);
    
} 

// document.getElementById('minutes').innerHTML= durationMin;
// document.getElementById('sec').innerHTML= durationSec;

