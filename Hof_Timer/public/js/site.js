var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var secondsCircle = document.querySelector('.secondCircle');
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;


window.onload = function() {
    startTimerButton = document.querySelector('.startTimer');
    pauseTimerButton = document.querySelector('.pauseTimer');
    secondsCircle = document.querySelector('.secondCircle');
    timerDisplay = document.querySelector('.timer');
    startTime;
    updatedTime;
    difference;
    tInterval;
    savedTime;
    paused = 0;
    running = 0;
}

function startTimer() {
    secondsCircle.style.webkitAnimation = "";
    secondsCircle.style.webkitAnimationPlayState = "running";
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   

        paused = 0;
        running = 1;

        startTimerButton.innerHTML = "PAUSE";
        // timerDisplay.style.background = "#FF0000";
        // timerDisplay.style.cursor = "auto";
        // timerDisplay.style.color = "yellow";
        // startTimerButton.classList.add('lighter');
        // pauseTimerButton.classList.remove('lighter');
        // startTimerButton.style.cursor = "auto";
        // pauseTimerButton.style.cursor = "pointer";
    } else {
        pauseTimer()
    }
}

function pauseTimer() {
    secondsCircle.style.webkitAnimationPlayState = "paused";
    startTimerButton.innerHTML = "PLAY";
    if (!difference) {
        // if timer never started, don't allow pause button to do anything
    } else if (!paused) {
        clearInterval(tInterval);
        savedTime = difference;
        paused = 1;
        running = 0;
        // timerDisplay.style.background = "#A90000";
        // timerDisplay.style.color = "#690000";
        // timerDisplay.style.cursor = "pointer";
        // startTimerButton.classList.remove('lighter');
        // pauseTimerButton.classList.add('lighter');
        // startTimerButton.style.cursor = "pointer";
        // pauseTimerButton.style.cursor = "auto";
    } else {

        // if the timer was already paused, when they click pause again, start the timer again

        //startTimer();
    }
}

function resetTimer() {
    secondsCircle.style.webkitAnimation = "none";
    startTimerButton.innerHTML = "PLAY";

    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    timerDisplay.innerHTML = '00:00';
    //timerDisplay.style.background = "#A90000";
    // timerDisplay.style.color = "#fff";
    // timerDisplay.style.cursor = "pointer";
    // startTimerButton.classList.remove('lighter');
    // pauseTimerButton.classList.remove('lighter');
    // startTimerButton.style.cursor = "pointer";
    // pauseTimerButton.style.cursor = "auto";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }

    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((difference % 1000) / 100);

    if (hours == 1) {
        alert("One Hour!");
    }

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    //milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    //milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
    timerDisplay.innerHTML = minutes + ':' + seconds;
    //    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}