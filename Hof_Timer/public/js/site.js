var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var secondsCircle = document.querySelector('.secondCircle');
var timerDisplay = document.querySelector('.timer');
var totalTimerDisplay = document.querySelector('.timerTotal');

var startTime;
var totalStartTime;
var updatedTime;
var updatedTotalTime;
var difference;
var totalDifference;
var tInterval;
var tIntervalTotal;
var savedTime;
var totalSavedTime;
var paused = 0;
var running = 0;
var state = 0;
var totalTimerState;
var round;
let tableRef;
let newRow;

window.onload = function() {
    tableRef = document.getElementById('tableBody');

    startTimerButton = document.querySelector('.startTimer');
    pauseTimerButton = document.querySelector('.pauseTimer');
    secondsCircle = document.querySelector('.secondCircle');
    timerDisplay = document.querySelector('.timer');
    totalTimerDisplay = document.querySelector('.timerTotal');
    paused = 0;
    running = 0;
    state = 0;
    totalTimerState = true;
    round = 1;

    document.body.onkeydown = function(e) {
        if (e.keyCode == 32) {
            startTimer();
        }
    }
}

function startTimer() {
    secondsCircle.style.webkitAnimation = "";
    secondsCircle.style.webkitAnimationPlayState = "running";
    if (tInterval == undefined) {
        tInterval = setInterval(getShowTime, 1);
        tIntervalTotal = setInterval(totalTime, 1);
    }

    if (state == 0) {
        startTime = new Date().getTime();


        // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   


        if (round > 1) {
            let squeezeCell = newRow.insertCell(3);
            var timerValue = timerDisplay.innerHTML;
            let timedValue = document.createTextNode(timerValue);
            squeezeCell.appendChild(timedValue);
        }
        newRow = tableRef.insertRow(0);
        let roundCell = newRow.insertCell(0);
        let roundValue = document.createTextNode(round);
        roundCell.appendChild(roundValue);




        paused = 0;
        running = 1;

        startTimerButton.innerHTML = "HOF";


        //state = 1;
    } else if (state == 1) {
        startTimerButton.innerHTML = "HOLD";
        let hofCell = newRow.insertCell(1);
        var timerValue = timerDisplay.innerHTML;
        let timedValue = document.createTextNode(timerValue);
        hofCell.appendChild(timedValue);
        startTime = new Date().getTime();
    } else if (state == 2) {
        startTimerButton.innerHTML = "SQUEEZE";
        let holdCell = newRow.insertCell(2);
        var timerValue = timerDisplay.innerHTML;
        let timedValue = document.createTextNode(timerValue);
        holdCell.appendChild(timedValue);

        startTime = new Date().getTime();
    }
    state++;
    if (state > 2) {

        state = 0;
        addRowToArray();
        round++;
    }
}

function addRowToArray() {

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
    } else {

        // if the timer was already paused, when they click pause again, start the timer again

        //startTimer();
    }
}

function resetTimer() {
    secondsCircle.style.webkitAnimation = "none";
    startTimerButton.innerHTML = "START";

    clearInterval(tInterval);
    clearInterval(tIntervalTotal);
    tInterval = undefined;
    tIntervalTotal = undefined;
    state = 0;
    totalTimerState = true;
    round = 1;
    // savedTime = 0;
    // totalSavedTime = 0;
    // startTime = 0;
    // totalStartTime = 0;
    // difference = 0;
    // totalDifference = 0;
    // paused = 0;
    // running = 0;
    timerDisplay.innerHTML = '00:00';
    totalTimerDisplay.innerHTML = '00:00';
    tableRef.innerHTML = "";
}

function getShowTime() {

    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }

    //var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);


    // if (hours == 1) {
    //     alert("One Hour!");
    // }

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timerDisplay.innerHTML = minutes + ':' + seconds;

}

function totalTime() {
    if (totalTimerState) {
        totalStartTime = startTime
        totalTimerState = false;

    }
    updatedTotalTime = new Date().getTime();




    totalDifference = updatedTotalTime - totalStartTime;


    var hours = Math.floor((totalDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((totalDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((totalDifference % (1000 * 60)) / 1000);


    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (hours == 1) {

        totalTimerDisplay.innerHTML = hours + ":" + minutes + ':' + seconds + "<br>One Hour! You Beast!";
    } else {
        totalTimerDisplay.innerHTML = hours + ":" + minutes + ':' + seconds;
    }
}