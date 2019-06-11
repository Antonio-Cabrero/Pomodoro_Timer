//Timer Fuction
function pomodoroTimer () {
var durationMin = 25;
var durationSec = 60;

while (durationMin > 0) {
     a = setInterval(
    if (durationSec > 0) {
    durationSec -= 1;
    console.log(durationSec)},100);
} else {
    durationMin -= 1;
    console.log(durationMin);
}
}

// document.getElementById('minutes').innerHTML= durationMin;
// document.getElementById('sec').innerHTML= durationSec;
}
